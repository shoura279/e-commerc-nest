import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { queryParser } from './common/middleware/queryParser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(queryParser)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
// SOLID >> Single Responsibly
// SOLID >> O >> open close >> open for extends close for modification
