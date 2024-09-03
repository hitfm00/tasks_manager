import { useQuery } from "@tanstack/react-query";

import { api } from "@/requests/api";
import { showNotification } from "@/helpers/notification";


export const fetchTask = async (id?: string) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

export const useTask = (id?: string) => {
  const data = useQuery({
    enabled: !!id,
    queryKey: [id, "tasks:get"],
    queryFn: () => fetchTask(id),
  });
  if (data.isError) {
    showNotification({
      type: "error",
      message: "Щось пішло не так з завантаженням завдання! Спробуйте пізніше.",
    });
  }
  return data;
};
