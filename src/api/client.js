const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

function getToken() {
  return localStorage.getItem("hh_token");
}

async function request(path, { method = "GET", body, isFormData = false } = {}) {
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (!isFormData) headers["Content-Type"] = "application/json";

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return null;

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error || `Request failed with status ${res.status}`);
  }

  return data;
}

export const api = {
  get: (path) => request(path),
  post: (path, body, opts = {}) => request(path, { method: "POST", body, ...opts }),
  put: (path, body, opts = {}) => request(path, { method: "PUT", body, ...opts }),
  del: (path) => request(path, { method: "DELETE" }),
};

// Prefixes an uploaded image path (e.g. "/uploads/foo.png") with the API origin
export function resolveImageUrl(src) {
  if (!src) return src;
  if (src.startsWith("http") || src.startsWith("/images")) return src; // already absolute or a public asset
  return `${API_URL}${src}`;
}

export { API_URL };
