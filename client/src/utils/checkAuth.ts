import { redirect } from "@tanstack/react-router";


export const checkAuth = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw redirect({
      to: "/login",
    });
  }
};
