import type { Todo } from "../models/todo.model";

export const TODO_REPOSITORY = Symbol("TodoRepository");

export interface TodoRepositoryPort {
  save(todo: Todo): Promise<void>;
  findById(id: string): Promise<Todo | null>;
  findAll(): Promise<Todo[]>;
}
