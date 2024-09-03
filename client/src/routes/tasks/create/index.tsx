import { createFileRoute } from "@tanstack/react-router";

import { AdminLayout } from "@/layouts/AdminLayout";
import { CreateTaskScreen } from "@/screens/CreateTaskScreen";


export const Route = createFileRoute("/tasks/create/")({
  component: () => (
    <AdminLayout>
      <CreateTaskScreen />
    </AdminLayout>
  ),
});
