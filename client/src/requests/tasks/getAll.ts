import { useQuery } from "@tanstack/react-query";

import { api } from "@/requests/api";
import { showNotification } from "@/helpers/notification";


export const fetchAllTasks = async () => {
  const response = await api.get("/tasks?limit=10&page=1&order=ASC");
  return response.data;
};

export const useTasks = () => {
  const data = useQuery({
    queryKey: ["tasks:all"],
    queryFn: fetchAllTasks,
  });
  if (data.isError) {
    showNotification({
      type: "error",
      message:
        "Щось пішло не так з завантаженням списку завдань! Спробуйте пізніше.",
    });
  }
  return data;
};
