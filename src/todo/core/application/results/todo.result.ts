import type { TodoStatus } from "../../domain/enums/todo-status.enum";
import type { Todo } from "../models/todo.model";

export interface TodoResult {
  id: string;
  title: string;
  description: string | null;
  status: TodoStatus;
  createdAt: Date;
}

export function toTodoResult({ id, title, description, status, createdAt }: Todo): TodoResult {
  return { id, title, description, status, createdAt };
}
