export class ResponseUtil {
  static success<T>(
    data: T,
    msg: string = 'success',
  ): { code: number; data: T; msg: string } {
    return {
      code: 200,
      data,
      msg,
    };
  }

  static error(
    code: number,
    msg: any = 'error',
    data:any = null
  ): { code: number; data: null; msg: string } {
    return {
      code,
      data,
      msg,
    };
  }
}
