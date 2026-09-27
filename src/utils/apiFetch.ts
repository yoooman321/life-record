import type { ApiError } from '@/type';

const getBaseURL = (): string => {
  //   if (import.meta.env.PROD) return import.meta.env.VITE_API_BASE_URL;
  return import.meta.env.VITE_API_BASE_URL;
};

// Convert camelCase to snake_case for request body
const toSnakeCase = (obj: any): any => {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCase);
  }
  if (typeof obj === 'object' && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      const snakeKey = key.replace(
        /[A-Z]/g,
        (letter) => `_${letter.toLowerCase()}`,
      );
      acc[snakeKey] = toSnakeCase(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
};

// Convert snake_case to camelCase for response
export const toCamelCase = (obj: any): any => {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase);
  }
  if (typeof obj === 'object' && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase(),
      );
      acc[camelKey] = toCamelCase(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
};

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  token?: string | null;
  siteId?: string | null;
  useFormData?: boolean;
  convertToSnakeCase?: boolean;
  convertToCamelCase?: boolean;
}

export class ApiClientError extends Error {
  statusCode: number;
  errorCode: string;
  errors: any[];

  constructor(
    statusCode: number,
    errorCode: string,
    errors: any[],
    message?: string,
  ) {
    // Always prioritize errors array for user-friendly messages
    // Only use custom message if errors array is empty
    const errorMessage =
      errors.length > 0 ? errors.join(', ') : message || '未知錯誤';
    super(errorMessage);
    this.name = 'ApiClientError';
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.errors = errors;
  }
}

export const apiClient = async <T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> => {
  const {
    method = 'GET',
    body,
    headers = {},
    // token,
    // siteId,
    useFormData = false,
    convertToSnakeCase: convertRequest = true,
    convertToCamelCase: convertResponse = true,
  } = options;

  const url = `${getBaseURL()}${endpoint}`;

  const requestHeaders: HeadersInit = {
    ...headers,
  };

  // Add Content-Type if not FormData
  if (!useFormData && !headers['Content-Type']) {
    requestHeaders['Content-Type'] = 'application/json';
  }

  let requestBody: BodyInit | undefined;
  if (body) {
    if (useFormData) {
      // If body is already FormData, use it directly
      if (body instanceof FormData) {
        requestBody = body;
      } else {
        // Convert object to FormData
        const formData = new FormData();
        Object.keys(body).forEach((key) => {
          const value = body[key];
          if (value !== null && value !== undefined) {
            if (value instanceof File || value instanceof FileList) {
              // Handle File or FileList
              const files =
                value instanceof FileList ? Array.from(value) : [value];
              files.forEach((file) => formData.append(key, file));
            } else if (Array.isArray(value)) {
              // Handle arrays (e.g., serial_number_ids)
              if (typeof value[0] === 'object') {
                formData.append(key, JSON.stringify(value));
              } else {
                value.forEach((item) =>
                  formData.append(`${key}[]`, String(item)),
                );
              }
            } else {
              formData.append(key, String(value));
            }
          }
        });
        requestBody = formData;
      }
    } else {
      // Convert to JSON
      const jsonBody = convertRequest ? toSnakeCase(body) : body;
      requestBody = JSON.stringify(jsonBody);
    }
  }

  try {
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: requestBody,
    });

    let data: any;
    try {
      data = await response.json();
    } catch (jsonError) {
      // If response is not JSON, throw error
      throw new ApiClientError(response.status, 'E99999', [
        '伺服器回應格式錯誤',
      ]);
    }

    // Handle error responses
    if (!response.ok || data.status === 'error') {
      const errorData = data as ApiError;
      const errorCode = errorData.error_code || 'E99999';
      const errors = errorData?.data?.errors ||
        errorData?.errors || ['未知錯誤'];

      // Handle token expiration (E01004 error code or token expired message)
      //   if (errorCode === 'E01004') {
      //     handleTokenExpiration()
      //   }

      throw new ApiClientError(response.status, errorCode, errors);
    }

    // Convert response to camelCase if needed
    const responseData = convertResponse ? toCamelCase(data) : data;

    // Handle success response
    if (responseData.status === 'success') {
      return responseData.data as T;
    }

    // If no status field, assume the entire response is the data
    return responseData as T;
  } catch (error) {
    console.error('apiClient error', error);
    // // Re-throw ApiClientError as-is
    // if (error instanceof ApiClientError) {
    //   throw error;
    // }

    // Handle other errors
    throw error;
  }
};

/**
 * Convenience methods for common HTTP methods
 */
export const api = {
  get: <T>(
    endpoint: string,
    options?: Omit<RequestOptions, 'method' | 'body'>,
  ) => apiClient<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(
    endpoint: string,
    body?: any,
    options?: Omit<RequestOptions, 'method' | 'body'>,
  ) => apiClient<T>(endpoint, { ...options, method: 'POST', body }),

  put: <T>(
    endpoint: string,
    body?: any,
    options?: Omit<RequestOptions, 'method' | 'body'>,
  ) => apiClient<T>(endpoint, { ...options, method: 'PUT', body }),

  patch: <T>(
    endpoint: string,
    body?: any,
    options?: Omit<RequestOptions, 'method' | 'body'>,
  ) => apiClient<T>(endpoint, { ...options, method: 'PATCH', body }),

  delete: <T>(
    endpoint: string,
    options?: Omit<RequestOptions, 'method' | 'body'>,
  ) => apiClient<T>(endpoint, { ...options, method: 'DELETE' }),
};
