import { useMutation } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";

import { api } from "@/requests/api";


export const logoutFetch = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const useLogout = () => {
  return useMutation({
    mutationKey: ["auth:logout"],
    mutationFn: logoutFetch,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenExpires");

      window.location.href = "/login";

      showNotification({
        type: "success",
        message: "Ви успішно вийшли з системи!",
      });
    },
    onError: () => {
      showNotification({
        type: "error",
        message: "Щось пішло не так! Спробуйте пізніше.",
      });
    },
  });
};
