import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/requests/api";
import { showNotification } from "@/helpers/notification";


export const fetchDeleteTask = async (id: number | string) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: ["tasks:delete"],
    mutationFn: fetchDeleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks:all"] });

      showNotification({
        type: "success",
        message: "Завдання успішно видалено!",
      });
    },
    onError: () => {
      showNotification({
        type: "error",
        message: "Щось пішло не так з видаленням завдання! Спробуйте пізніше.",
      });
    },
  });

  return data;
};
