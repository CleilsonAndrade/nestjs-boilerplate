import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import path from 'path';
import { SwaggerTheme } from 'swagger-themes';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { cors: true },
  );

  const configService = app.get(ConfigService);
  const NODE_ENV = configService.get('NODE_ENV');
  const PORT = configService.get('PORT');

  let options;
  let config;

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidUnknownValues: false }),
  );

  const descriptionHTML = fs.readFileSync(
    `${path.resolve(__dirname)}/docs/index.html`,
    'utf-8',
  );

  const faviconPath = `data:image/png;base64,${fs
    .readFileSync(path.resolve(__dirname, 'docs', 'assets', 'favicon.png'))
    .toString('base64')}`;

  const theme = new SwaggerTheme('v3');
  const themeStyle = theme.getBuffer('classic'); // Themes: 'classic', 'dark'
  const cssPath = fs
    .readFileSync(path.resolve(__dirname, 'docs', 'assets', 'swagger-ui.css'))
    .toString();

  if (NODE_ENV === 'production') {
    options = {
      swaggerOptions: {
        supportedSubmitMethods: [],
      },
      customfavIcon: faviconPath,
      customCss: themeStyle + cssPath,
      customSiteTitle: 'NestJS - API Swagger UI',
    };

    config = new DocumentBuilder()
      .setTitle('NestJS Repository Pattern - API')
      .addTag('Default', 'Standard module for grouping endpoints')
      .setDescription(descriptionHTML)
      .setExternalDoc('Documentation NestJs', 'https://docs.nestjs.com/')
      .setVersion('1.0')
      .setContact(
        'Support',
        'https://enterprise.nestjs.com/',
        'support@nestjs.com',
      )
      .setTermsOfService(
        `https://raw.githubusercontent.com/nestjs/nest/master/LICENSE`,
      )
      .build();
  } else if (NODE_ENV === 'development') {
    options = {
      customfavIcon: faviconPath,
      customCss: themeStyle + cssPath,
      customSiteTitle: 'NestJS - API Swagger UI',
    };

    config = new DocumentBuilder()
      .addSecurity('bearer', {
        type: 'http',
        scheme: 'bearer',
      })
      .setTitle('NestJS Repository Pattern - API')
      .addTag('Default', 'Standard module for grouping endpoints')
      .setDescription(descriptionHTML)
      .setExternalDoc('Documentation NestJs', 'https://docs.nestjs.com/')
      .setVersion('1.0')
      .setContact(
        'Support',
        'https://enterprise.nestjs.com/',
        'support@nestjs.com',
      )
      .setLicense(
        'License',
        `https://raw.githubusercontent.com/CleilsonAndrade/nestjs-boilerplate/main/LICENSE`,
      )
      .setTermsOfService(
        `https://raw.githubusercontent.com/nestjs/nest/master/LICENSE`,
      )
      .addBearerAuth()
      .build();
  } else {
    throw new Error(
      'Please set the environment to use: "production" or "development"',
    );
  }

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, options);

  await app.listen(PORT ?? 3000, '0.0.0.0');
  console.log(`[🤖]: Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch((e) => {
  console.log(e);
});
