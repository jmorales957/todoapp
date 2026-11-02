import { TodoNotFoundError } from "../errors/todo-not-found.error";
import type { TodoRepositoryPort } from "../ports/todo.repository.port";
import type { GetTodoQuery } from "../queries/get-todo.query";
import { toTodoResult, type TodoResult } from "../results/todo.result";

export class GetTodoUseCase {
  constructor(private readonly todoRepository: TodoRepositoryPort) {}

  async execute({ id }: GetTodoQuery): Promise<TodoResult> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new TodoNotFoundError(`todo ${id} not found`);
    }
    return toTodoResult(todo);
  }
}
