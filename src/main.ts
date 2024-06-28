import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  const config = new DocumentBuilder()
    .setTitle('Social backend')
    .setDescription('LinkedIn clone api')
    .setVersion('1.0')
    .addTag('API для приложения клона LinkedIn')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-swag', app, document);
  await app.listen(PORT, () => console.log(`Server started on PORT=${PORT}`));
}

bootstrap();
