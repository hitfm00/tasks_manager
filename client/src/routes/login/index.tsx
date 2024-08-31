import { createFileRoute } from "@tanstack/react-router";

import { LoginScreen } from "../../screens/LoginScreen";


export const Route = createFileRoute("/login/")({
  component: () => <LoginPage />,
});

function LoginPage() {
  return <LoginScreen />;
}
