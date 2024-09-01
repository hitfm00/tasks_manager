export interface NestJsErrorResponse {
  error: string;
  message: string | string[];
  stack?: string;
  statusCode: number;
  timestamp: string;
  trace?: {
    message: string;
    name: string;
    options?: Record<string, string>;
    response?: {
      error: string;
    };
    status: number;
  };
}
