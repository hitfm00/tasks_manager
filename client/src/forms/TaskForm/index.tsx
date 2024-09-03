import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Flex,
  Stack,
  Switch,
  Textarea,
  TextInput,
} from "@mantine/core";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { FC, useEffect } from "react";

import { useCreateTask } from "@/requests/tasks/create";
import {
  CreateTaskSchema,
  CreateTaskSchemaType,
} from "@/schemas/task/CreateTaskSchema";
import { TaskSchemaType } from "@/schemas/task/TaskSchema";
import { useUpdateTask } from "@/requests/tasks/update";


type Props = {
  initialData: TaskSchemaType;
};

export const TaskForm: FC<Props> = ({ initialData }) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    control,
  } = useForm<CreateTaskSchemaType>({
    resolver: zodResolver(CreateTaskSchema),
  });

  const { mutateAsync: createTask } = useCreateTask();
  const { mutateAsync: updateTask } = useUpdateTask(initialData?.slug);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<CreateTaskSchemaType> = async (data) => {
    if (initialData) {
      await updateTask({ id: initialData.id, body: data });
    } else {
      await createTask(data);
    }

    navigate({ to: "/tasks" });
  };

  useEffect(() => {
    if (!initialData) return;
    reset(initialData);
  }, [initialData, reset]);

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
      <Flex align="flex-end" justify="space-between" gap="md">
        <TextInput
          label="Назва задачі"
          placeholder="Назва"
          size="md"
          error={errors.title?.message}
          w="100%"
          {...register("title")}
        />
        <TextInput
          label="Slug"
          placeholder="new-slug"
          size="md"
          w="100%"
          error={errors.slug?.message}
          {...register("slug")}
          description="Це поле буде використано для формування посилання на задачу."
        />
      </Flex>
      <Textarea
        label="Опис задачі"
        placeholder="Опис"
        size="md"
        rows={3}
        error={errors.content?.message}
        {...register("content")}
      />
      <Controller
        name="completed"
        control={control}
        render={({ field }) => (
          <Switch
            label="Завершено"
            description="Позначте, якщо задача вже виконана"
            size="lg"
            checked={field.value}
            onChange={(event) => field.onChange(event.currentTarget.checked)}
          />
        )}
      />

      <Button fullWidth mt="xl" size="md" type="submit">
        {initialData ? "Зберегти" : "Створити"}
      </Button>
    </Stack>
  );
};
