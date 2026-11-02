import { BadRequestException, Catch, NotFoundException, type ArgumentsHost, type HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { AppError, type AppErrorType } from "../../domain/errors/app.error";

const toHttpException: Record<AppErrorType, (message: string) => HttpException> = {
  validation: (message) => new BadRequestException(message),
  not_found: (message) => new NotFoundException(message),
};

@Catch(AppError)
export class AppErrorFilter extends BaseExceptionFilter {
  override catch(error: AppError, host: ArgumentsHost): void {
    super.catch(toHttpException[error.type](error.message), host);
  }
}
