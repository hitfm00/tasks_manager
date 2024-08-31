import { createFileRoute } from "@tanstack/react-router";

import { AdminLayout } from "../../layouts/AdminLayout";


export const Route = createFileRoute("/tasks/$taskId")({
  component: () => <AdminLayout>Hello /tasks/$taskId!</AdminLayout>,
});
