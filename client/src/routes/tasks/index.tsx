import { createFileRoute } from "@tanstack/react-router";

import { AdminLayout } from "@/layouts/AdminLayout";
import { TaskScreen } from "@/screens/TaskScreen";
import { checkAuth } from "@/utils/checkAuth";


export const Route = createFileRoute("/tasks/")({
  component: () => (
    <AdminLayout>
      <TaskScreen />
    </AdminLayout>
  ),

  beforeLoad: checkAuth,
});
