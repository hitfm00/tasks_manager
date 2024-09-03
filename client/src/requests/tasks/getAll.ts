import { useQuery } from "@tanstack/react-query";

import { api } from "@/requests/api";
import { showNotification } from "@/helpers/notification";


type PropsTaskType = {
  completed?: boolean;
};

export const fetchAllTasks = async (props: PropsTaskType) => {
  const response = await api.get(`/tasks?limit=10&page=1&order=ASC`, {
    params: {
      completed: props.completed,
    },
  });
  return response.data;
};

export const useTasks = (props: PropsTaskType) => {
  const data = useQuery({
    queryKey: ["tasks:all", props.completed],
    queryFn: () => fetchAllTasks(props),
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
