/*
 * @Date: 2025-03-10 14:19:07
 * @LastEditors: DMBro 2073620106@qq.com
 * @LastEditTime: 2025-03-12 16:04:59
 * @FilePath: \img_parse\src\common\utils\url.utils.ts
 */
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
    const normalizedPath = imagePath.startsWith('/')
      ? imagePath
      : `/${imagePath}`;

    // 返回完整的 URL
    return `${domainPrefix}${normalizedPath}`;
  }

  /**
   * 获取缩略图url
   * @param originalUrl 图片的 URL
   * @returns 缩略图url
   */
  static convertToThumbnailUrl(originalUrl: string) {
    // 支持的图片扩展名列表
    const imageExtensions = [
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.webp',
      '.bmp',
      '.tiff',
    ];

    // 查找URL中的图片扩展名
    const extension = imageExtensions.find((ext) =>
      originalUrl.toLowerCase().endsWith(ext),
    );

    if (extension) {
      // 在扩展名之前插入 -thumb
      return originalUrl.replace(
        new RegExp(`${extension}$`),
        `-thumb${extension}`,
      );
    }

    // 如果不是图片文件，返回原始URL
    return originalUrl;
  }
}
