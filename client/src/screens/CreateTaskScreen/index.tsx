import { Title } from "@mantine/core";
import { useParams } from "@tanstack/react-router";

import { TaskForm } from "@/forms/TaskForm";
import { useTask } from "@/requests/tasks/get";

import classes from "./CreateTaskScreen.module.scss";


export function CreateTaskScreen() {
  const { id } = useParams({ strict: false });
  const { data } = useTask(id);

  return (
    <div className={classes.wrapper}>
      <Title mb="md">Створення завдання</Title>
      <TaskForm initialData={data} />
    </div>
  );
}
