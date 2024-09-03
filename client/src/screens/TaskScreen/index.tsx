import { createColumnHelper } from "@tanstack/react-table";
import { Box, Select, Switch } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { useTasks } from "@/requests/tasks/getAll";
import { TaskSchemaType } from "@/schemas/task/TaskSchema";
import { Table } from "@/ui/Table";
import { useDeleteTask } from "@/requests/tasks/delete";
import { useToggleCompletedTask } from "@/requests/tasks/toggleCompleted";
import { Route } from "@/routes/tasks";

// Определение типа для параметров поиска
interface SearchParams {
  completed?: string;
}

export function TaskScreen() {
  const navigate = useNavigate();

  // Извлечение параметров поиска
  const { completed } = Route.useSearch<SearchParams>();

  const [completedValue, setCompletedValue] = useState<boolean | undefined>();

  useEffect(() => {
    if (completed === "true") {
      setCompletedValue(true);
    } else if (completed === "false") {
      setCompletedValue(false);
    } else {
      setCompletedValue(undefined);
    }
  }, [completed]);

  const { data } = useTasks({ completed: completedValue });
  const { mutateAsync: deleteTask } = useDeleteTask();
  const { mutateAsync: toggleCompleted } = useToggleCompletedTask();

  const columnHelper = createColumnHelper<TaskSchemaType>();
  const columns = [
    columnHelper.accessor("title", {
      header: "Назва",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("slug", {
      header: "Slug",
      cell: (info) => <i>{info.getValue()}</i>,
    }),
    columnHelper.accessor("completed", {
      header: "Завершено",
      cell: (info) => (
        <Switch
          checked={info.getValue()}
          onChange={() =>
            toggleCompleted({ id: (info.row.original as TaskSchemaType).id })
          }
        />
      ),
    }),
  ];

  const handleCompletedChange = (value: string | null) => {
    if (value === "undefined") {
      setCompletedValue(undefined);
      navigate({ search: {} });
    } else {
      const newValue = value === "true";
      setCompletedValue(newValue);
      navigate({ search: { completed: value } });
    }
  };

  return (
    <Box>
      <Select
        data={[
          { value: "undefined", label: "Всі" },
          { value: "false", label: "Поточні" },
          { value: "true", label: "Завершені" },
        ]}
        value={
          completedValue !== undefined ? completedValue.toString() : "undefined"
        }
        onChange={handleCompletedChange}
        allowDeselect={false}
        mb="sm"
      />
      {data?.data && (
        <Table
          data={data.data}
          columns={columns}
          actions={{
            onEdit: (element) =>
              navigate({ to: `/tasks/edit/${(element as TaskSchemaType).id}` }),
            onDelete: (element) => deleteTask((element as TaskSchemaType).id),
          }}
        />
      )}
    </Box>
  );
}
