export interface ApiResponse<TData = unknown> {
    status: number; // HTTP status code
    headers: Headers; // Response headers
    data: TData; // Parsed response data
}
