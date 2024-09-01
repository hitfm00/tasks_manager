import "@/styles/reset.scss";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { Notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { theme } from "@/theme";


type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60,
    },
  },
});

export const MainLayout: FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} withCssVariables>
        <Notifications />

        {children}
      </MantineProvider>
    </QueryClientProvider>
  );
};
