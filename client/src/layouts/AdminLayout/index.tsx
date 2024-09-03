import { FC } from "react";
import { Paper } from "@mantine/core";

import { AppShell } from "../../widgets/AppShell";


type Props = {
  children: React.ReactNode;
};

export const AdminLayout: FC<Props> = ({ children }) => {
  return (
    <AppShell>
      <Paper shadow="lg" ml="md" p="md" radius="lg">
        {children}
      </Paper>
    </AppShell>
  );
};
