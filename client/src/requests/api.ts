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

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      (error.response.status === 401 && !originalRequest._retry) ||
      !isTokenValid()
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
            {
              refreshToken,
            },
          );
          const newAccessToken = response.data.accessToken;
          const newRefreshtoken = response.data.refreshToken;
          const newTokenExpires = response.data.tokenExpires;
          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("tokenExpires", newTokenExpires);
          localStorage.setItem("refreshToken", newRefreshtoken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (error) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("tokenExpires");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
          return Promise.reject(error); // Предотвращает дальнейшее выполнение кода
        }
      }
    }
    return Promise.reject(error);
  },
);
export { api, authApi };
