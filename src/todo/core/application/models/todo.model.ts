import type { TodoStatus } from "../../domain/enums/todo-status.enum";

export interface Todo {
  id: string;
  title: string;
  description: string | null;
  status: TodoStatus;
  createdAt: Date;
}
