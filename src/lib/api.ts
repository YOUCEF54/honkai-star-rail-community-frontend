export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
  const res = await fetch(`${base}${path}`, {
    ...options,
    credentials: "include", // if you use cookies
    headers: {
      ...(options.headers || {}),
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(`API error ${res.status}: ${message}`);
  }

  return res.json();
}
