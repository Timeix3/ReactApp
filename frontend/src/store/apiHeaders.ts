export function prepareAuthHeaders(headers: Headers): Headers {
  const token = localStorage.getItem('access_token');
  if (token) {
    headers.set('authorization', `Bearer ${token}`);
  }
  return headers;
}
