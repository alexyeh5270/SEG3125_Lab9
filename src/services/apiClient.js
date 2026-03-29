const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export async function getJson(path, options = {}) {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not configured");
  }

  const normalizedBase = API_BASE_URL.replace(/\/+$/, "");
  const normalizedPath = String(path || "").replace(/^\/+/, "");
  const url = new URL(`${normalizedBase}/${normalizedPath}`);

  if (options.query) {
    Object.entries(options.query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const { query: _query, ...fetchOptions } = options;

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(fetchOptions.headers || {}),
    },
    ...fetchOptions,
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error(
        "You are being rate-limited by the server. Please try again later.",
      );
    }
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}
