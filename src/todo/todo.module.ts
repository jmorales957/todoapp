import { Module } from "@nestjs/common";
import { TODO_REPOSITORY, type TodoRepositoryPort } from "./core/application/ports/todo.repository.port";
import { CreateTodoUseCase } from "./core/application/use-cases/create-todo.use-case";
import { GetTodoUseCase } from "./core/application/use-cases/get-todo.use-case";
import { ListTodosUseCase } from "./core/application/use-cases/list-todos.use-case";
import { TodoController } from "./inbound/http/v1/todo.controller";
import { InMemoryTodoRepository } from "./outbound/persistence/memory/todo/todo.repository.impl";

@Module({
  controllers: [TodoController],
  providers: [
    { provide: TODO_REPOSITORY, useClass: InMemoryTodoRepository },
    {
      provide: CreateTodoUseCase,
      useFactory: (todoRepository: TodoRepositoryPort) => new CreateTodoUseCase(todoRepository),
      inject: [TODO_REPOSITORY],
    },
    {
      provide: GetTodoUseCase,
      useFactory: (todoRepository: TodoRepositoryPort) => new GetTodoUseCase(todoRepository),
      inject: [TODO_REPOSITORY],
    },
    {
      provide: ListTodosUseCase,
      useFactory: (todoRepository: TodoRepositoryPort) => new ListTodosUseCase(todoRepository),
      inject: [TODO_REPOSITORY],
    },
  ],
})
export class TodoModule {}
