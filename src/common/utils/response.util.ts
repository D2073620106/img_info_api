export class ResponseUtil {
  static success<T, R>(
    data: T,
    message: string = 'success',
    meta?: R,
  ): { code: number; data: T; meta: R; message: string } {
    return {
      code: 200,
      data,
      meta: meta ? meta : ({} as R),
      message,
    };
  }

  static error(
    code: number,
    message: any = 'error',
    data: any = null,
  ): { code: number; data: null; message: string } {
    return {
      code,
      data,
      message,
    };
  }
}
