import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });

  const configService = app.get(ConfigService);

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

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
