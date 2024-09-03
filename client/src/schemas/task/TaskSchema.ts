import z from "zod";


export const TaskSchema = z.object({
  id: z.number(),
  title: z
    .string({ message: "Поле обов'язкове" })
    .min(3, { message: "Мінімум 3 символи" }),
  slug: z
    .string({ message: "Поле обов'язкове" })
    .min(3, { message: "Мінімум 3 символи" }),
  content: z.string().nullish(),
  completed: z.boolean().default(false),
});

export type TaskSchemaType = z.infer<typeof TaskSchema>;
