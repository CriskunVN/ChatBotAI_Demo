import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const frontendOrigin = process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173';

  app.enableCors({
    origin: frontendOrigin === '*' ? '*' : frontendOrigin,
    credentials: true,
  });

  const port = Number(process.env.PORT ?? 3000);

  await app.listen(port);
  Logger.log(`Server is running on http://localhost:${port}`);
}
bootstrap();
