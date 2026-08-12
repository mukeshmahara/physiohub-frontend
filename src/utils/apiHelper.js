/**
 * PhysioHub API Helper Utility
 * A lightweight, feature-rich HTTP client supporting GET, POST, PUT, PATCH, DELETE,
 * File Uploads, Downloads, Request/Response Interceptors, and Token Management.
 */

// Default Configuration
const DEFAULT_CONFIG = {
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api",
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

/**
 * Custom API Error Class
 */
export class ApiError extends Error {
  constructor(message, status, data = null, options = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
    this.isNetworkError = options.isNetworkError || false;
    this.isTimeout = options.isTimeout || false;
  }
}

class ApiClient {
  constructor(config = {}) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
      headers: {
        ...DEFAULT_CONFIG.headers,
        ...config.headers,
      },
    };

    this.requestInterceptors = [];
    this.responseInterceptors = [];
  }

  /**
   * Set Base URL dynamically
   */
  setBaseURL(baseURL) {
    this.config.baseURL = baseURL;
  }

  /**
   * Get Authorization Token from Storage
   */
  getAuthToken() {
    return (
      localStorage.getItem("authToken") ||
      sessionStorage.getItem("authToken") ||
      null
    );
  }

  /**
   * Set Authorization Token
   */
  setAuthToken(token, remember = true) {
    if (remember) {
      localStorage.setItem("authToken", token);
    } else {
      sessionStorage.setItem("authToken", token);
    }
  }

  /**
   * Clear Authorization Token (Logout)
   */
  clearAuthToken() {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
  }

  /**
   * Add Request Interceptor
   * @param {Function} fn (config) => modifiedConfig
   */
  addRequestInterceptor(fn) {
    this.requestInterceptors.push(fn);
  }

  /**
   * Add Response Interceptor
   * @param {Function} fn (response) => modifiedResponse
   */
  addResponseInterceptor(fn) {
    this.responseInterceptors.push(fn);
  }

  /**
   * Build Full URL with Query Parameters
   */
  buildURL(endpoint, params = {}) {
    // If endpoint starts with http:// or https://, use as is
    let fullURL = /^https?:\/\//i.test(endpoint)
      ? endpoint
      : `${this.config.baseURL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

    const cleanParams = Object.entries(params).reduce((acc, [key, val]) => {
      if (val !== undefined && val !== null && val !== "") {
        acc[key] = val;
      }
      return acc;
    }, {});

    const queryString = new URLSearchParams(cleanParams).toString();
    if (queryString) {
      fullURL += (fullURL.includes("?") ? "&" : "?") + queryString;
    }

    return fullURL;
  }

  /**
   * Core Request Dispatcher using Fetch + AbortController
   */
  async request(endpoint, options = {}) {
    const {
      method = "GET",
      data = null,
      params = {},
      headers = {},
      timeout = this.config.timeout,
      requiresAuth = true,
      ...customOptions
    } = options;

    let requestHeaders = {
      ...this.config.headers,
      ...headers,
    };

    // Auto-inject Auth token if available and required
    if (requiresAuth) {
      const token = this.getAuthToken();
      if (token) {
        requestHeaders["Authorization"] = `Bearer ${token}`;
      }
    }

    // Handle FormData (browser sets boundary automatically)
    let body = data;
    if (data instanceof FormData) {
      delete requestHeaders["Content-Type"];
    } else if (data && typeof data === "object" && !(data instanceof Blob)) {
      body = JSON.stringify(data);
    }

    // Build final request config
    let finalConfig = {
      method,
      headers: requestHeaders,
      body: method !== "GET" && method !== "HEAD" ? body : undefined,
      ...customOptions,
    };

    // Execute Request Interceptors
    for (const interceptor of this.requestInterceptors) {
      finalConfig = (await interceptor(finalConfig)) || finalConfig;
    }

    // Timeout Controller
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    finalConfig.signal = controller.signal;

    const url = this.buildURL(endpoint, params);

    try {
      const response = await fetch(url, finalConfig);
      clearTimeout(timeoutId);

      // Execute Response Interceptors
      let interceptedResponse = response;
      for (const interceptor of this.responseInterceptors) {
        interceptedResponse =
          (await interceptor(interceptedResponse)) || interceptedResponse;
      }

      // Handle 401 Unauthorized globally
      if (interceptedResponse.status === 401) {
        this.clearAuthToken();
        // Optional: trigger auth redirect event or callback
      }

      // Parse Response Data
      let responseData = null;
      const contentType = interceptedResponse.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        responseData = await interceptedResponse.json();
      } else {
        responseData = await interceptedResponse.text();
      }

      // Check HTTP Success
      if (!interceptedResponse.ok) {
        const errorMessage =
          (responseData && responseData.message) ||
          (responseData && responseData.error) ||
          `HTTP Error ${interceptedResponse.status}: ${interceptedResponse.statusText}`;

        throw new ApiError(
          errorMessage,
          interceptedResponse.status,
          responseData
        );
      }

      return {
        data: responseData,
        status: interceptedResponse.status,
        headers: interceptedResponse.headers,
      };
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof ApiError) {
        throw error;
      }

      if (error.name === "AbortError") {
        throw new ApiError(`Request timed out after ${timeout}ms`, 0, null, {
          isTimeout: true,
        });
      }

      throw new ApiError(
        error.message || "Network connection error",
        0,
        null,
        { isNetworkError: true }
      );
    }
  }

  /**
   * HTTP GET Request
   */
  get(endpoint, params = {}, options = {}) {
    return this.request(endpoint, { method: "GET", params, ...options });
  }

  /**
   * HTTP POST Request
   */
  post(endpoint, data = {}, options = {}) {
    return this.request(endpoint, { method: "POST", data, ...options });
  }

  /**
   * HTTP PUT Request
   */
  put(endpoint, data = {}, options = {}) {
    return this.request(endpoint, { method: "PUT", data, ...options });
  }

  /**
   * HTTP PATCH Request
   */
  patch(endpoint, data = {}, options = {}) {
    return this.request(endpoint, { method: "PATCH", data, ...options });
  }

  /**
   * HTTP DELETE Request
   */
  delete(endpoint, data = {}, options = {}) {
    return this.request(endpoint, { method: "DELETE", data, ...options });
  }

  /**
   * File Upload (Multipart Form Data)
   */
  upload(endpoint, fileOrFormData, fieldName = "file", options = {}) {
    let formData;
    if (fileOrFormData instanceof FormData) {
      formData = fileOrFormData;
    } else {
      formData = new FormData();
      formData.append(fieldName, fileOrFormData);
    }

    return this.post(endpoint, formData, {
      ...options,
      headers: {
        ...(options.headers || {}),
        // Content-Type deleted automatically in request() for FormData
      },
    });
  }

  /**
   * File Download (Blob)
   */
  async download(endpoint, fileName = "download", params = {}, options = {}) {
    const response = await this.request(endpoint, {
      method: "GET",
      params,
      ...options,
      headers: {
        Accept: "*/*",
        ...(options.headers || {}),
      },
    });

    // Handle Blob creation and trigger browser download
    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);

    return true;
  }
}

// Instantiate default singleton instance
export const api = new ApiClient();

// Export class for creating custom isolated instances if needed
export default ApiClient;
