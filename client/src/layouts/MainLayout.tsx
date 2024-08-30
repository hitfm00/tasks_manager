import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { FC } from "react";
import { theme } from "../theme";

type Props = {
  children: React.ReactNode;
};

export const MainLayout: FC<Props> = ({ children }) => {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
};
