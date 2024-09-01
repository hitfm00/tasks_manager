import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { authApi } from "@/requests/api";
import { showNotification } from "@/helpers/notification";
import { getErrorMessage } from "@/helpers/errorCodes";
import { NestJsErrorResponse } from "@/interfaces/NestJsErrorResponse";


type LoginBody = {
  email: string;
  password: string;
};

export const loginFetch = async (body: LoginBody) => {
  const response = await authApi.post("/auth/email/login", body);
  return response.data;
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ["auth:login"],
    mutationFn: loginFetch,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("tokenExpires", data.tokenExpires);
      showNotification({
        type: "success",
        message: "Ви успішно увійшли в систему!",
      });
    },
    onError: (error: AxiosError) => {
      const nestedError = error?.response?.data as NestJsErrorResponse;
      showNotification({
        type: "error",
        message: getErrorMessage(nestedError),
      });
    },
  });
};
