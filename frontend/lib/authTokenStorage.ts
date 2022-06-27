const STORAGE_KEY = "token";

const store = (token: string): void => {
  if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, token);
};

const get = (): string | null => {
  return typeof window !== "undefined"
    ? localStorage.getItem(STORAGE_KEY)
    : null;
};

const remove = (): void => {
  if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
};

export const authTokenStorage = { get, store, remove };
