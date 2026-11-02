import type { TodoResult } from "../../../../core/application/results/todo.result";
import type { TodoStatus } from "../../../../core/domain/enums/todo-status.enum";

export interface TodoResponse {
  id: string;
  title: string;
  description: string | null;
  status: TodoStatus;
  createdAt: string;
}

export function presentTodo({ id, title, description, status, createdAt }: TodoResult): TodoResponse {
  return { id, title, description, status, createdAt: createdAt.toISOString() };
}
