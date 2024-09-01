import { Paper, Title } from "@mantine/core";

import { LoginForm } from "@/forms/LoginForm";

import classes from "./LoginScreen.module.scss";


export function LoginScreen() {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Ласкаво просимо в Tasks Manager!
        </Title>
        <LoginForm />
      </Paper>
    </div>
  );
}
