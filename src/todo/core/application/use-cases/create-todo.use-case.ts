import { randomUUID } from "node:crypto";
import { TodoStatus } from "../../domain/enums/todo-status.enum";
import { InvalidTodoError } from "../../domain/errors/invalid-todo.error";
import type { CreateTodoCommand } from "../commands/create-todo.command";
import type { Todo } from "../models/todo.model";
import type { TodoRepositoryPort } from "../ports/todo.repository.port";
import { toTodoResult, type TodoResult } from "../results/todo.result";

export class CreateTodoUseCase {
  constructor(private readonly todoRepository: TodoRepositoryPort) {}

  async execute({ title, description }: CreateTodoCommand): Promise<TodoResult> {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      throw new InvalidTodoError("title is required");
    }

    const todo: Todo = {
      id: randomUUID(),
      title: trimmedTitle,
      description: description?.trim() || null,
      status: TodoStatus.Pending,
      createdAt: new Date(),
    };
    await this.todoRepository.save(todo);
    return toTodoResult(todo);
  }
}
