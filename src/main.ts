import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import {ValidationPipe} from "@nestjs/common";

const logStream = fs.createWriteStream('api.log', {
  flags: 'a',
});

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
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    morgan('combined', {
      stream: logStream,
    }),
  );
  await app.listen(PORT, () => console.log(`Server started on PORT=${PORT}`));
}

bootstrap();
