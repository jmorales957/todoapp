import { AppError } from "../../../../shared/core/domain/errors/app.error";

export class TodoNotFoundError extends AppError {
  readonly type = "not_found";
}
