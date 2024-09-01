
import { useTasks } from "@/requests/tasks/getAll";
import { Table } from "@/ui/Table";


export function TaskScreen() {
  const { data, isLoading, isError } = useTasks();

  return <Table data={data} columns={[]} />;
}
