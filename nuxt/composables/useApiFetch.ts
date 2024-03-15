import type { UseFetchOptions } from "#app";

export function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
  const headers: any = {};

  const token = useCookie("XSRF-TOKEN");

  if (token.value) {
    headers["X-XSRF-TOKEN"] = token.value as string;
  }

  return useFetch("http://localhost:8000" + path, {
    credentials: "include",
    watch: false,
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  });
}
