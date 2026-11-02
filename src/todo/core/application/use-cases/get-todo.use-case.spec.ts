import { describe, expect, it } from "vitest";
import { TodoStatus } from "../../domain/enums/todo-status.enum";
import { TodoNotFoundError } from "../errors/todo-not-found.error";
import type { Todo } from "../models/todo.model";
import type { TodoRepositoryPort } from "../ports/todo.repository.port";
import { GetTodoUseCase } from "./get-todo.use-case";

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

describe("GetTodoUseCase", () => {
  it("returns the todo with the given id", async () => {
    const todo: Todo = {
      id: "todo-1",
      title: "Comprar pan",
      description: null,
      status: TodoStatus.Pending,
      createdAt: new Date(),
    };
    const useCase = new GetTodoUseCase(new FakeTodoRepository([todo]));

    await expect(useCase.execute({ id: "todo-1" })).resolves.toEqual(todo);
  });

  it("throws TodoNotFoundError when the todo does not exist", async () => {
    const useCase = new GetTodoUseCase(new FakeTodoRepository());

    await expect(useCase.execute({ id: "missing" })).rejects.toThrow(TodoNotFoundError);
  });
});
