export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error?: {
    code: string;
    message: string;
    details?: any[];
  };
}

export interface ApiHealthResponse {
  status: string;
  service: string;
  timestamp: string;
  uptime: number;
}

export interface ApiDatabaseHealthResponse {
  database: string;
  status: string;
  connected: boolean;
  host: string;
  timestamp: string;
}
