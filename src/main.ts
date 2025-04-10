import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import  { ValidationPipe} from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  app.useGlobalPipes(new ValidationPipe())

  //  use the document builder to create a new swagger document configuration
  const config = new DocumentBuilder()
    .setTitle('Autonomy Hall App Api')
    .setDescription('API Documentation for Autonomy Hall App')
    .setVersion('1.0')
    .addTag('Autonomy Hall App')
    .build();

  //  create the Swagger document
  const document = SwaggerModule.createDocument(app, config);

  //  use the SwaggerModule to serve the Swagger document
  SwaggerModule.setup('api', app, document, { jsonDocumentUrl: 'swagger/json' });

  console.log('Server is running on http://localhost:3000/api');
  await app.listen(3000);
}
bootstrap();
