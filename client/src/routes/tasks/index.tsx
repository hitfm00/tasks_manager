import { createFileRoute } from "@tanstack/react-router";

import { AdminLayout } from "../../layouts/AdminLayout";


export const Route = createFileRoute("/tasks/")({
  component: () => <AdminLayout>Hello /tasks/!</AdminLayout>,
});
