// API Response types matching the backend format
export interface ApiResponse<T> {
  status: 'success';
  data: T;
}

export interface ApiError {
  status: 'error';
  error_code: string;
  errors: string[];
  data?: {
    errors?: any[];
  };
}

export interface PaginatedResponse<T> {
  status: 'success';
  data: {
    items: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      total_pages: number;
    };
  };
}
