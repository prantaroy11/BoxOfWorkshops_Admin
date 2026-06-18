const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...((options.headers as Record<string, string>) || {}),
    },
    ...options,
  };

  const response = await fetch(
    `${BASE_URL}${endpoint}`,
    config
  );

  if (response.status === 401) {
    localStorage.removeItem('admin_token');
    if (typeof document !== 'undefined') {
      document.cookie = `admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
    
    // Only redirect if we are not already trying to log in
    if (!endpoint.includes('/login')) {
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    let errorMessage = 'Something went wrong';
    
    if (typeof errorData.message === 'string') {
      errorMessage = errorData.message;
    } else if (typeof errorData.error === 'string') {
      errorMessage = errorData.error;
    } else if (errorData.message?.message) {
      errorMessage = errorData.message.message;
    } else if (errorData.error?.message) {
      errorMessage = errorData.error.message;
    } else if (errorData.message) {
      errorMessage = JSON.stringify(errorData.message);
    } else if (errorData.error) {
      errorMessage = JSON.stringify(errorData.error);
    }

    throw new Error(errorMessage);
  }



  return response.json();
}

export const api = {
  get: <T>(endpoint: string) =>
    request<T>(endpoint),
  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  patch: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: 'DELETE' }),
};
