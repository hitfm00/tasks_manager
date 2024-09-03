import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/requests/api";
import { showNotification } from "@/helpers/notification";


export const fetchToggleTaskCompleted = async ({ id }: { id: number }) => {
  const response = await api.patch(`/tasks/${id}/toggle`);
  return response.data;
};

export const useToggleCompletedTask = (id?: string) => {
  const client = useQueryClient();
  const data = useMutation({
    mutationKey: ["tasks:update", id],
    mutationFn: fetchToggleTaskCompleted,
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: ["tasks:all"],
      });
      await client.invalidateQueries({
        queryKey: [id, "tasks:get"],
      });

      showNotification({
        type: "success",
        message: "Завдання успішно оновлено!",
      });
    },
    onError: () => {
      showNotification({
        type: "error",
        message: "Щось пішло не так з оновленням завдання! Спробуйте пізніше.",
      });
    },
  });

  return data;
};
