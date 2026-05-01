export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly payload?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const toErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) return `${error.message} (status: ${error.status})`;
  if (error instanceof Error) return error.message;
  return "予期しないエラーが発生しました。";
};
