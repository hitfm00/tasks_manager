import "@/styles/reset.scss";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { theme } from "@/theme";


type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({});

export const MainLayout: FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} withCssVariables>
        <Notifications />
        <ReactQueryDevtools />

        {children}
      </MantineProvider>
    </QueryClientProvider>
  );
};
