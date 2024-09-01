import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const isTokenValid = () => {
  const tokenExpires = localStorage.getItem("tokenExpires");

  if (!tokenExpires) return false;

  return parseInt(tokenExpires, 10) > Date.now();
};

// Add authorization header to requests
api.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem("accessToken") as string;

    if (!accessToken || !isTokenValid()) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const response = await api.post("/auth/refresh", { refreshToken });
          accessToken = response.data.accessToken;
          const newTokenExpires = response.data.tokenExpires;

          if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("tokenExpires", newTokenExpires); // Обновляем время истечения токена
          }
        } catch (error) {
          // Если обновление токена не удалось, разлогиньте пользователя
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("tokenExpires");
          // window.location.href = "/login"; // Перенаправление на страницу логина
          return Promise.reject(error);
        }
      } else {
        // Если нет рефреш-токена, перенаправляем на логин
        // window.location.href = "/login";
        return Promise.reject("No refresh token available");
      }
    }

    // Добавление токена в заголовок
    config.headers["Authorization"] = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Refresh token if 401 response
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await api.post("/auth/refresh", { refreshToken });
        const newAccessToken = response.data.accessToken;
        const newTokenExpires = response.data.tokenExpires;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("tokenExpires", newTokenExpires);

        api.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("tokenExpires");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export { api, authApi };
