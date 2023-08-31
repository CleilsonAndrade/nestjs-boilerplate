import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  DocumentBuilder,
  SwaggerModule,
  type SwaggerCustomOptions,
} from '@nestjs/swagger';
import * as fs from 'fs';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { cors: true },
  );

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidUnknownValues: false }),
  );

  const descriptionHTML = fs.readFileSync('path_to_file_html', 'utf-8');

  const options: SwaggerCustomOptions = {
    customSiteTitle: 'NestJS Boilerplate - API Documentation',
  };

  const config = new DocumentBuilder()
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
    })
    .setTitle('NestJS Repository Pattern - API')
    .addTag('Default', 'Standard module for grouping endpoints')
    .setDescription(descriptionHTML)
    .setExternalDoc('Documetation NestJs', 'https://docs.nestjs.com/')
    .setVersion('1.0')
    .setContact(
      'Support',
      'https://enterprise.nestjs.com/',
      'support@nestjs.com',
    )
    .setTermsOfService(
      `https://raw.githubusercontent.com/nestjs/nest/master/LICENSE`,
    )
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, options);

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  console.log(`[🤖]: Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch((e) => {
  console.log(e);
});
