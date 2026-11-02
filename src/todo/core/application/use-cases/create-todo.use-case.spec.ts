import { describe, expect, it } from "vitest";
import { TodoStatus } from "../../domain/enums/todo-status.enum";
import { InvalidTodoError } from "../../domain/errors/invalid-todo.error";
import type { Todo } from "../models/todo.model";
import type { TodoRepositoryPort } from "../ports/todo.repository.port";
import { CreateTodoUseCase } from "./create-todo.use-case";

class FakeTodoRepository implements TodoRepositoryPort {
  saved: Todo[] = [];

  async save(todo: Todo): Promise<void> {
    this.saved.push(todo);
  }

  async findById(id: string): Promise<Todo | null> {
    return this.saved.find((todo) => todo.id === id) ?? null;
  }

  async findAll(): Promise<Todo[]> {
    return this.saved;
  }
}

describe("CreateTodoUseCase", () => {
  it("creates a pending todo and saves it", async () => {
    const repository = new FakeTodoRepository();
    const useCase = new CreateTodoUseCase(repository);

    const todo = await useCase.execute({ title: "  Comprar pan ", description: "Integral" });

    expect(todo).toMatchObject({ title: "Comprar pan", description: "Integral", status: TodoStatus.Pending });
    expect(todo.id).toEqual(expect.any(String));
    expect(repository.saved).toEqual([todo]);
  });

  it("sets description to null when it is missing", async () => {
    const useCase = new CreateTodoUseCase(new FakeTodoRepository());

    const todo = await useCase.execute({ title: "Sin descripción" });

    expect(todo.description).toBeNull();
  });

  it("rejects a blank title without saving", async () => {
    const repository = new FakeTodoRepository();
    const useCase = new CreateTodoUseCase(repository);

    await expect(useCase.execute({ title: "   " })).rejects.toThrow(InvalidTodoError);
    expect(repository.saved).toEqual([]);
  });
});
