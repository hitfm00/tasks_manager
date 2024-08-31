import { Paper, TextInput, PasswordInput, Button, Title } from "@mantine/core";

import classes from "./LoginScreen.module.scss";


export function LoginScreen() {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Ласкаво просимо в Tasks Manager!
        </Title>

        <TextInput label="Email" placeholder="admin@maincast.com" size="md" />
        <PasswordInput
          label="Password"
          placeholder="Ваш пароль"
          mt="md"
          size="md"
        />
        <Button fullWidth mt="xl" size="md">
          Увійти
        </Button>
      </Paper>
    </div>
  );
}
