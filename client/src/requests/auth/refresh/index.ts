import { useMutation } from "@tanstack/react-query";

import api from "@/requests/api";


type RefreshBody = {
  refreshToken: string;
};

export const refreshTokenFetch = async (body: RefreshBody) => {
  const response = await api.post("/auth/refresh", body);
  return response.data;
};

export const useRefreshToken = () => {
  return useMutation({
    mutationKey: ["auth:refresh"],
    mutationFn: refreshTokenFetch,
    onError: (error) => {
      console.error(error);
    },
  });
};
