import kyVanilla from "ky";
import { authTokenStorage } from "./authTokenStorage";

const BASE_URL = "http://localhost:7000";

type ApiError = {
  message?: string;
  messages?: string[];
  status?: number;
};

const parseApiError = async (
  res: Response
): Promise<{ message: string; status: number }> => {
  try {
    const { message, messages }: ApiError = await res.json();
    let errorMessage = "Error message not provided";

    if (message) {
      errorMessage = message;
    }

    if (messages && messages.length) {
      errorMessage = messages.join("\n");
    }

    return { message: errorMessage, status: res.status };
  } catch {
    return { message: res.statusText, status: res.status };
  }
};

export const ky = kyVanilla.extend({
  retry: {
    limit: 1,
  },
  prefixUrl: BASE_URL,
  timeout: false,
  hooks: {
    afterResponse: [
      async (req, options, res) => {
        if (res.ok) {
          return;
        }

        if (res.status === 401 && document.location.pathname !== "/auth") {
          // authTokenStorage.remove();
          document.location.reload();
          return;
        }

        const { message, status } = await parseApiError(res);

        throw new Error(`(${status}) ${message}`);
      },
    ],
    beforeRequest: [
      (request) => {
        const token = authTokenStorage.get();
        if (token) {
          request.headers.set("Authorization", token);
        }
      },
    ],
  },
});
