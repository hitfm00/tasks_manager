import { createFileRoute } from "@tanstack/react-router";

import { AdminLayout } from "@/layouts/AdminLayout";
import { CreateTaskScreen } from "@/screens/CreateTaskScreen";
import { checkAuth } from "@/utils/checkAuth";


export const Route = createFileRoute("/tasks/create/")({
  component: () => (
    <AdminLayout>
      <CreateTaskScreen />
    </AdminLayout>
  ),
  beforeLoad: checkAuth,
});
