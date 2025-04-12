/*
 * @Date: 2025-03-08 11:31:39
 * @LastEditors: DMBro 2073620106@qq.com
 * @LastEditTime: 2025-03-12 15:30:04
 * @FilePath: \img_parse\src\main.ts
 */
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { DefaultStatusInterceptor } from '@/common/interceptors/default-status.interceptor';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from '@/common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });

  const configService = app.get(ConfigService);

  // 设置全局前缀，并排除 /health 路由
  app.setGlobalPrefix('api', {
    // exclude: ['health'], // 排除 /health 路由
  });

  // 注册全局守卫
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  // 添加全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      validationError: { target: false },
    }),
  );

  // 检查是否启用 Swagger
  const isSwaggerEnabled = configService.get<boolean>('SWAGGER_ENABLE', false);
  if (isSwaggerEnabled) {
    const config = new DocumentBuilder()
      .setTitle(configService.get<string>('SWAGGER_TITLE', 'API 文档'))
      .setDescription(
        configService.get<string>('SWAGGER_DESCRIPTION', 'API 文档描述'),
      )
      .setVersion(configService.get<string>('SWAGGER_VERSION', '1.0'))
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(
      configService.get<string>('SWAGGER_PATH', 'api'),
      app,
      document,
    );
  }

  // 注册全局异常过滤器
  app.useGlobalFilters(new GlobalExceptionFilter());

  // 注册全局拦截器
  // app.useGlobalInterceptors(new DefaultStatusInterceptor());

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
