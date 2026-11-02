import { describe, expect, it } from "vitest";
import { TodoStatus } from "../../domain/enums/todo-status.enum";
import type { Todo } from "../models/todo.model";
import type { TodoRepositoryPort } from "../ports/todo.repository.port";
import { ListTodosUseCase } from "./list-todos.use-case";

class FakeTodoRepository implements TodoRepositoryPort {
  constructor(private readonly todos: Todo[] = []) {}

  async save(todo: Todo): Promise<void> {
    this.todos.push(todo);
  }

  async findById(id: string): Promise<Todo | null> {
    return this.todos.find((todo) => todo.id === id) ?? null;
  }

  async findAll(): Promise<Todo[]> {
    return this.todos;
  }
}

describe("ListTodosUseCase", () => {
  it("returns all todos", async () => {
    const todos: Todo[] = [
      { id: "todo-1", title: "Comprar pan", description: null, status: TodoStatus.Pending, createdAt: new Date() },
      { id: "todo-2", title: "Pagar luz", description: "Antes del viernes", status: TodoStatus.Pending, createdAt: new Date() },
    ];
    const useCase = new ListTodosUseCase(new FakeTodoRepository(todos));

    await expect(useCase.execute()).resolves.toEqual(todos);
  });

  it("returns an empty list when there are no todos", async () => {
    const useCase = new ListTodosUseCase(new FakeTodoRepository());

    await expect(useCase.execute()).resolves.toEqual([]);
  });
});
