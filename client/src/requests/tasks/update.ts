import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/requests/api";
import { showNotification } from "@/helpers/notification";


type UpdateTaskBody = {
  title: string;
  completed: boolean;
  slug: string;
  content?: string | null;
};

export const fetchUpdateTask = async ({
  id,
  body,
}: {
  id: number;
  body: UpdateTaskBody;
}) => {
  const response = await api.patch(`/tasks/${id}`, body);
  return response.data;
};

export const useUpdateTask = (id?: string) => {
  const client = useQueryClient();
  const data = useMutation({
    mutationKey: ["tasks:update", id],
    mutationFn: fetchUpdateTask,
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
