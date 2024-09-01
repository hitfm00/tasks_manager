import { useMutation } from "@tanstack/react-query";

import api from "@/requests/api";


export const logoutFetch = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const useLogout = () => {
  return useMutation({
    mutationKey: ["auth:logout"],
    mutationFn: logoutFetch,
    onError: (error) => {
      console.error(error);
    },
  });
};
