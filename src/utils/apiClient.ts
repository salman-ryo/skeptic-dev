type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiOptions<TBody = unknown> {
    method?: HttpMethod;
    headers?: HeadersInit;
    body?: TBody;
}

interface ApiResponse<T> {
    status: number;
    headers: Headers;
    data: T;
}

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async fetchWithDetails<T>(
        endpoint: string,
        options: RequestInit
    ): Promise<ApiResponse<T>> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, options);

        const contentType = response.headers.get('Content-Type') || '';
        let data: T | null = null;

        // Parse JSON if content type indicates JSON
        if (contentType.includes('application/json')) {
            data = await response.json();
        }

        // If the response is not OK, throw an error
        if (!response.ok) {
            throw {
                status: response.status,
                statusText: response.statusText,
                data,
            };
        }

        return {
            status: response.status,
            headers: response.headers,
            data: data as T,
        };
    }

    async request<TResponse, TBody = undefined>(
        endpoint: string,
        options: ApiOptions<TBody> = {}
    ): Promise<ApiResponse<TResponse>> {
        const { method = 'GET', headers, body } = options;

        const fetchOptions: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: body ? JSON.stringify(body) : undefined,
        };

        return this.fetchWithDetails<TResponse>(endpoint, fetchOptions);
    }

    async get<TResponse>(
        endpoint: string,
        headers?: HeadersInit
    ): Promise<ApiResponse<TResponse>> {
        return this.request<TResponse>(endpoint, { method: 'GET', headers });
    }

    async post<TResponse, TBody>(
        endpoint: string,
        body: TBody,
        headers?: HeadersInit
    ): Promise<ApiResponse<TResponse>> {
        return this.request<TResponse, TBody>(endpoint, {
            method: 'POST',
            body,
            headers,
        });
    }

    async put<TResponse, TBody>(
        endpoint: string,
        body: TBody,
        headers?: HeadersInit
    ): Promise<ApiResponse<TResponse>> {
        return this.request<TResponse, TBody>(endpoint, {
            method: 'PUT',
            body,
            headers,
        });
    }

    async delete<TResponse>(
        endpoint: string,
        headers?: HeadersInit
    ): Promise<ApiResponse<TResponse>> {
        return this.request<TResponse>(endpoint, { method: 'DELETE', headers });
    }
}

export const api = new ApiClient("")
