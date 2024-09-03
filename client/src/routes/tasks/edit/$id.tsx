import { createFileRoute } from "@tanstack/react-router";

import { checkAuth } from "@/utils/checkAuth";
import { CreateTaskScreen } from "@/screens/CreateTaskScreen";
import { AdminLayout } from "@/layouts/AdminLayout";


export const Route = createFileRoute("/tasks/edit/$id")({
  component: () => (
    <AdminLayout>
      <CreateTaskScreen />
    </AdminLayout>
  ),
  beforeLoad: checkAuth,
});
