import { zodResolver } from "@hookform/resolvers/zod";
import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";

import { LoginSchema, LoginSchemaType } from "@/schemas/auth/LoginSchema";
import { useLogin } from "@/requests/auth/login";


export const LoginForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const { mutateAsync: login } = useLogin();
  const navigate = useNavigate(); // Получаем функцию для навигации

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    try {
      await login(data);

      // Редирект после успешного логина
      navigate({ to: "/tasks" });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Email"
        placeholder="admin@maincast.com"
        size="md"
        error={errors.email?.message}
        {...register("email")}
      />
      <PasswordInput
        label="Password"
        placeholder="Ваш пароль"
        mt="md"
        size="md"
        error={errors.password?.message}
        {...register("password")}
      />
      <Button fullWidth mt="xl" size="md" type="submit">
        Увійти
      </Button>
    </Stack>
  );
};
