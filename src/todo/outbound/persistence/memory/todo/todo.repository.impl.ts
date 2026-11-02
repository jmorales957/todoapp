import { Injectable } from "@nestjs/common";
import type { Todo } from "../../../../core/application/models/todo.model";
import type { TodoRepositoryPort } from "../../../../core/application/ports/todo.repository.port";

@Injectable()
export class InMemoryTodoRepository implements TodoRepositoryPort {
  private readonly todos = new Map<string, Todo>();

  async save(todo: Todo): Promise<void> {
    this.todos.set(todo.id, todo);
  }

  async findById(id: string): Promise<Todo | null> {
    return this.todos.get(id) ?? null;
  }

  async findAll(): Promise<Todo[]> {
    return [...this.todos.values()];
  }
}
