import z from "zod";

import { TaskSchema } from "./TaskSchema";


export const CreateTaskSchema = TaskSchema.omit({ id: true });

export type CreateTaskSchemaType = z.infer<typeof CreateTaskSchema>;
