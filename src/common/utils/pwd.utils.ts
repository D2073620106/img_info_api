import { createHash } from 'node:crypto';

export class PwdUtils {
  static encryptPassword(password: string, salt: string): string {
    // 第一次加密：密码 + 盐值
    let encrypted = createHash('md5')
      .update(password + salt)
      .digest('hex');

    // 第二次加密：第一次加密结果 + 盐值
    encrypted = createHash('md5')
      .update(encrypted + salt)
      .digest('hex');

    // 第三次加密：第二次加密结果 + 盐值
    encrypted = createHash('md5')
      .update(encrypted + salt)
      .digest('hex');

    return encrypted;
  }
}
