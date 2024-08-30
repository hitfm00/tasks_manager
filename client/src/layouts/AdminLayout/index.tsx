import { FC } from "react";

import { AppShell } from "../../widgets/AppShell";


type Props = {
  children: React.ReactNode;
};

export const AdminLayout: FC<Props> = ({ children }) => {
  return <AppShell>{children}</AppShell>;
};
