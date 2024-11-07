import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import documentation from './config/documentation';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { END_POINTS } from './constants/end_points';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import InitFirebase from './libs/firebase';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  const env = configService.get<string>('env');
  const document = SwaggerModule.createDocument(app, documentation, {
    ignoreGlobalPrefix: true,
  });
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.use(helmet());
  app.use(cookieParser());
  app.setGlobalPrefix(END_POINTS.BASE);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  if (env === 'DEVELOPMENT') {
    app.useGlobalInterceptors(new LoggingInterceptor());
  }
  InitFirebase();
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT ?? 8081);
  console.log(`Server running on http://localhost:${port || 8081}/docs`);
}
bootstrap();
