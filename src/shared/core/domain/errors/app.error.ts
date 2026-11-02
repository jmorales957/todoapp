export type AppErrorType = "validation" | "not_found";

export abstract class AppError extends Error {
  abstract readonly type: AppErrorType;
}
