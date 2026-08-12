import { useState, useCallback } from "react";
import { api, ApiError } from "../utils/apiHelper";

/**
 * Custom React Hook for executing API requests with reactive state
 * (data, loading, error, execute)
 * 
 * Example usage:
 * const { data, loading, error, execute } = useApi(api.post);
 * const handleLogin = async () => {
 *   const res = await execute('/auth/login', { email, password });
 * };
 */
export function useApi(apiFunc) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiFunc.bind(api)(...args);
        setData(response.data);
        setLoading(false);
        return response.data;
      } catch (err) {
        const apiErr =
          err instanceof ApiError
            ? err
            : new ApiError(err.message || "An unexpected error occurred", 0);

        setError(apiErr);
        setLoading(false);
        throw apiErr;
      }
    },
    [apiFunc]
  );

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
}

export default useApi;
