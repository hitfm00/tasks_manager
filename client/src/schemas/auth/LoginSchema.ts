import z from "zod";


export const LoginSchema = z.object({
  email: z.string().email({ message: "Некоректний email" }),
  password: z
    .string()
    .min(6, { message: "Щонайменше 6 символів" })
    .max(25, { message: "Максимум 25 символів" }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
