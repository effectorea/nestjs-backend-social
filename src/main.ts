import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
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
