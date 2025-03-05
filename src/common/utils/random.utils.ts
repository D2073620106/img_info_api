export class RandomUtil {
  static getRandomChineseCharacter() {
    // Unicode 范围：常用汉字位于 \u4e00 到 \u9fa5 之间
    const start = 0x4e00;
    const end = 0x9fa5;
    const randomUnicode = Math.floor(Math.random() * (end - start + 1)) + start;
    return String.fromCharCode(randomUnicode);
  }

  static getRandomChineseString(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += this.getRandomChineseCharacter();
    }
    return result;
  }

  static getRandomString(length) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
