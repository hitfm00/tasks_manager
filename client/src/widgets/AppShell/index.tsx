import {
  AppShell as AppShellComponent,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  Burger,
  Button,
  Flex,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC } from "react";

import { useLogout } from "@/requests/auth/logout";

import { Logo } from "../../ui/Logo";
import { Navbar } from "../Navbar";
import css from "./AppShell.module.scss";


type Props = {
  children: React.ReactNode;
};

export const AppShell: FC<Props> = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();

  const { mutateAsync: logout } = useLogout();
  return (
    <AppShellComponent
      header={{ height: 60 }}
      navbar={{
        width: 230,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShellHeader my="xs">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Flex justify="space-between" align="center">
          <Logo />
          <Button onClick={() => logout()}>Logout</Button>
        </Flex>
      </AppShellHeader>

      <AppShellNavbar className={css.navbar}>
        <Navbar />
      </AppShellNavbar>

      <AppShellMain>{children}</AppShellMain>
    </AppShellComponent>
  );
};
