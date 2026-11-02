import type { TodoRepositoryPort } from "../ports/todo.repository.port";
import { toTodoResult, type TodoResult } from "../results/todo.result";

export class ListTodosUseCase {
  constructor(private readonly todoRepository: TodoRepositoryPort) {}

  async execute(): Promise<TodoResult[]> {
    const todos = await this.todoRepository.findAll();
    return todos.map(toTodoResult);
  }
}
