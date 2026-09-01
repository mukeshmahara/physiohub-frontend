/**
 * PhysioHub API Helper Utility
 *
 * Features:
 * - GET, POST, PUT, PATCH, DELETE
 * - File uploads
 * - File downloads
 * - Access token management
 * - Automatic access-token refresh on 401
 * - HttpOnly refresh-token cookie support
 * - Automatic retry of failed request
 */

const DEFAULT_CONFIG = {
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api/v1",

  timeout: 30000,

  // IMPORTANT:
  // This allows the browser to send the HttpOnly refresh_token cookie.
  credentials: "include",

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

/**
 * Custom API Error
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
        ...(config.headers || {}),
      },
    };

    this.requestInterceptors = [];
    this.responseInterceptors = [];

    /**
     * Promise used to prevent multiple simultaneous
     * refresh requests.
     *
     * Example:
     *
     * Request A -> 401
     * Request B -> 401
     * Request C -> 401
     *
     * Instead of making 3 refresh requests,
     * all three wait for the same refresh request.
     */
    this.refreshPromise = null;
  }

  /**
   * ============================================================
   * BASE URL
   * ============================================================
   */

  setBaseURL(baseURL) {
    this.config.baseURL = baseURL;
  }

  /**
   * ============================================================
   * ACCESS TOKEN
   * ============================================================
   */

  getAuthToken() {
    return (
      localStorage.getItem("authToken") ||
      sessionStorage.getItem("authToken") ||
      null
    );
  }

  setAuthToken(token, remember = true) {
    if (!token) {
      return;
    }

    if (remember) {
      localStorage.setItem("authToken", token);

      // Prevent stale sessionStorage token
      sessionStorage.removeItem("authToken");
    } else {
      sessionStorage.setItem("authToken", token);

      // Prevent stale localStorage token
      localStorage.removeItem("authToken");
    }
  }

  clearAuthToken() {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
  }

  /**
   * ============================================================
   * INTERCEPTORS
   * ============================================================
   */

  addRequestInterceptor(fn) {
    this.requestInterceptors.push(fn);
  }

  addResponseInterceptor(fn) {
    this.responseInterceptors.push(fn);
  }

  /**
   * ============================================================
   * URL
   * ============================================================
   */

  buildURL(endpoint, params = {}) {
    let fullURL = /^https?:\/\//i.test(endpoint)
      ? endpoint
      : `${this.config.baseURL.replace(/\/$/, "")}/${endpoint.replace(
          /^\//,
          "",
        )}`;

    const cleanParams = Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        acc[key] = value;
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
   * ============================================================
   * REFRESH ACCESS TOKEN
   * ============================================================
   *
   * IMPORTANT:
   *
   * We DO NOT read refresh_token from document.cookie.
   *
   * The refresh token should be HttpOnly.
   *
   * The browser automatically sends it because:
   *
   * credentials: "include"
   */

  async refreshAccessToken() {
    /**
     * If another request is already refreshing the token,
     * wait for that request instead of starting another one.
     */
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      try {
        const url = this.buildURL("/auth/refresh");

        const response = await fetch(url, {
          method: "POST",

          /**
           * This is what sends the HttpOnly refresh cookie.
           */
          credentials: "include",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        /**
         * Refresh token is invalid/expired/revoked.
         */
        if (!response.ok) {
          this.clearAuthToken();

          throw new ApiError(
            "Session expired. Please login again.",
            response.status,
          );
        }

        const data = await response.json();

        /**
         * Expected backend response:
         *
         * {
         *   access_token: "new-jwt-token",
         *   token_type: "Bearer",
         *   expires_in: 900
         * }
         */

        const newAccessToken =
          data.access_token || data.accessToken || data.token;

        if (!newAccessToken) {
          this.clearAuthToken();

          throw new ApiError(
            "Refresh endpoint did not return an access token.",
            500,
            data,
          );
        }

        /**
         * Store new access token.
         */
        const remember = !!localStorage.getItem("authToken");

        this.setAuthToken(newAccessToken, remember);

        return newAccessToken;
      } catch (error) {
        this.clearAuthToken();

        if (error instanceof ApiError) {
          throw error;
        }

        throw new ApiError(
          error.message || "Unable to refresh authentication session.",
          0,
          null,
          {
            isNetworkError: true,
          },
        );
      } finally {
        /**
         * Allow another refresh in the future.
         */
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  /**
   * ============================================================
   * REQUEST
   * ============================================================
   */

  async request(endpoint, options = {}) {
    const {
      method = "GET",
      data = null,
      params = {},
      headers = {},
      timeout = this.config.timeout,
      requiresAuth = true,

      /**
       * Internal flag.
       *
       * Prevents:
       *
       * request -> 401 -> refresh -> 401 -> refresh -> ...
       */
      _isRetry = false,

      ...customOptions
    } = options;

    /**
     * Build headers.
     */
    let requestHeaders = {
      ...this.config.headers,
      ...headers,
    };

    /**
     * Add access token.
     */
    if (requiresAuth) {
      const token = this.getAuthToken();

      if (token) {
        requestHeaders["Authorization"] = `Bearer ${token}`;
      }
    }

    /**
     * Prepare request body.
     */
    let body = data;

    if (data instanceof FormData) {
      /**
       * Browser automatically sets:
       *
       * multipart/form-data;
       * boundary=...
       *
       * Therefore do not manually set Content-Type.
       */
      delete requestHeaders["Content-Type"];
    } else if (data && typeof data === "object" && !(data instanceof Blob)) {
      body = JSON.stringify(data);
    }

    /**
     * Final fetch configuration.
     */
    let finalConfig = {
      method,

      /**
       * VERY IMPORTANT:
       *
       * This sends cookies.
       */
      credentials: this.config.credentials,

      headers: requestHeaders,

      body: method !== "GET" && method !== "HEAD" ? body : undefined,

      ...customOptions,
    };

    /**
     * Request interceptors.
     */
    for (const interceptor of this.requestInterceptors) {
      finalConfig = (await interceptor(finalConfig)) || finalConfig;
    }

    /**
     * Timeout controller.
     */
    const controller = new AbortController();

    const timeoutId = setTimeout(() => controller.abort(), timeout);

    finalConfig.signal = controller.signal;

    const url = this.buildURL(endpoint, params);

    try {
      let response = await fetch(url, finalConfig);

      clearTimeout(timeoutId);

      /**
       * ========================================================
       * RESPONSE INTERCEPTORS
       * ========================================================
       */

      let interceptedResponse = response;

      for (const interceptor of this.responseInterceptors) {
        interceptedResponse =
          (await interceptor(interceptedResponse)) || interceptedResponse;
      }

      /**
       * ========================================================
       * ACCESS TOKEN EXPIRED
       * ========================================================
       */

      if (
        interceptedResponse.status === 401 &&
        requiresAuth &&
        !_isRetry &&
        !this.isRefreshEndpoint(endpoint)
      ) {
        /**
         * Access token has probably expired.
         *
         * Do NOT immediately clear the access token.
         *
         * First attempt to refresh it.
         */

        try {
          const newAccessToken = await this.refreshAccessToken();

          /**
           * Create headers for retry.
           */
          const retryHeaders = {
            ...this.config.headers,
            ...headers,

            Authorization: `Bearer ${newAccessToken}`,
          };

          /**
           * Rebuild retry configuration.
           */
          const retryConfig = {
            ...finalConfig,

            headers: retryHeaders,

            /**
             * Prevent another refresh attempt
             * if retry also returns 401.
             */
            _isRetry: true,
          };

          /**
           * Remove internal property before fetch.
           */
          delete retryConfig._isRetry;

          /**
           * Retry original request.
           */
          response = await fetch(url, retryConfig);

          interceptedResponse = response;
        } catch (refreshError) {
          /**
           * Refresh token is invalid/expired.
           *
           * User must login again.
           */
          this.clearAuthToken();

          throw refreshError;
        }
      }

      /**
       * ========================================================
       * PARSE RESPONSE
       * ========================================================
       */

      let responseData = null;

      const contentType = interceptedResponse.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        responseData = await interceptedResponse.json();
      } else {
        responseData = await interceptedResponse.text();
      }

      /**
       * ========================================================
       * HANDLE ERROR
       * ========================================================
       */

      if (!interceptedResponse.ok) {
        /**
         * Only clear token when:
         *
         * 1. Request was retried
         * 2. It still returned 401
         *
         * This means refresh failed or the new token
         * is also invalid.
         */
        if (interceptedResponse.status === 401 && _isRetry) {
          this.clearAuthToken();
        }

        const errorMessage =
          (responseData && responseData.message) ||
          (responseData && responseData.error) ||
          `HTTP Error ${interceptedResponse.status}: ${interceptedResponse.statusText}`;

        throw new ApiError(
          errorMessage,
          interceptedResponse.status,
          responseData,
        );
      }

      /**
       * ========================================================
       * SUCCESS
       * ========================================================
       */

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

      throw new ApiError(error.message || "Network connection error", 0, null, {
        isNetworkError: true,
      });
    }
  }

  /**
   * ============================================================
   * CHECK REFRESH ENDPOINT
   * ============================================================
   */

  isRefreshEndpoint(endpoint) {
    const normalized = endpoint.replace(/^\/+/, "").replace(/\/+$/, "");

    return normalized === "auth/refresh" || normalized === "/auth/refresh";
  }

  /**
   * ============================================================
   * HTTP METHODS
   * ============================================================
   */

  get(endpoint, params = {}, options = {}) {
    return this.request(endpoint, {
      method: "GET",
      params,
      ...options,
    });
  }

  post(endpoint, data = {}, options = {}) {
    return this.request(endpoint, {
      method: "POST",
      data,
      ...options,
    });
  }

  put(endpoint, data = {}, options = {}) {
    return this.request(endpoint, {
      method: "PUT",
      data,
      ...options,
    });
  }

  patch(endpoint, data = {}, options = {}) {
    return this.request(endpoint, {
      method: "PATCH",
      data,
      ...options,
    });
  }

  delete(endpoint, data = {}, options = {}) {
    return this.request(endpoint, {
      method: "DELETE",
      data,
      ...options,
    });
  }

  /**
   * ============================================================
   * FILE UPLOAD
   * ============================================================
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
      },
    });
  }

  /**
   * ============================================================
   * FILE DOWNLOAD
   * ============================================================
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

/**
 * ============================================================
 * SINGLETON INSTANCE
 * ============================================================
 */

export const api = new ApiClient();

export default ApiClient;
