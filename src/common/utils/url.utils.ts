export class UrlUtils {
   /**
   * 为图片地址添加域名前缀
   * @param imagePath 图片的相对路径或完整 URL
   * @param domainPrefix 域名前缀，例如 'https://yourdomain.com'
   * @returns 完整的图片 URL
   */
  static addDomainPrefix(imagePath: string, domainPrefix: string): string {
    if (!imagePath) {
      return '';
    }

    // 如果图片路径已经是完整的 URL，直接返回
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }

    // 确保路径以斜杠开头
    const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

    // 返回完整的 URL
    return `${domainPrefix}${normalizedPath}`;
  }
 }
