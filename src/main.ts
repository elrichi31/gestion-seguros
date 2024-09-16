import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Gestión de Seguros API')
    .setDescription('API para la gestión de seguros multi-tenant')
    .setVersion('1.0')
    .addBearerAuth() // Añadir soporte de autenticación Bearer JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // La documentación estará disponible en '/api'

  // Validación global
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
