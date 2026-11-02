import { AppError } from "../../../../shared/core/domain/errors/app.error";

export class InvalidTodoError extends AppError {
  readonly type = "validation";
}
