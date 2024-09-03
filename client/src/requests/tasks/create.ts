import { useMutation } from "@tanstack/react-query";

import { api } from "@/requests/api";
import { showNotification } from "@/helpers/notification";


type CreateTaskBody = {
  title: string;
  completed: boolean;
  slug: string;
  content?: string;
};

export const fetchCreateTask = async (body: CreateTaskBody) => {
  const response = await api.post("/tasks", body);
  return response.data;
};

export const useCreateTask = () => {
  const data = useMutation({
    mutationKey: ["tasks:create"],
    mutationFn: fetchCreateTask,
    onError: () => {
      showNotification({
        type: "error",
        message: "Щось пішло не так з створенням завдання! Спробуйте пізніше.",
      });
    },
  });

  return data;
};
