import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { CreateTodoUseCase } from "../../../core/application/use-cases/create-todo.use-case";
import { GetTodoUseCase } from "../../../core/application/use-cases/get-todo.use-case";
import { ListTodosUseCase } from "../../../core/application/use-cases/list-todos.use-case";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { presentTodo, type TodoResponse } from "./presenters/todo.presenter";

@Controller("todo")
export class TodoController {
  constructor(
    private readonly createTodoUseCase: CreateTodoUseCase,
    private readonly getTodoUseCase: GetTodoUseCase,
    private readonly listTodosUseCase: ListTodosUseCase,
  ) {}

  @Post("create")
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateTodoDto): Promise<TodoResponse> {
    return presentTodo(await this.createTodoUseCase.execute(body));
  }

  @Get()
  async list(): Promise<TodoResponse[]> {
    const todos = await this.listTodosUseCase.execute();
    return todos.map(presentTodo);
  }

  @Get(":id")
  async get(@Param("id") id: string): Promise<TodoResponse> {
    return presentTodo(await this.getTodoUseCase.execute({ id }));
  }
}
