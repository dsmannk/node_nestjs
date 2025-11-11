import { ValidationPipe } from '@nestjs/common'; // validationPipe 임포트
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser()); // 쿠키 파서 설정
  // 전역 파이프에 validationPipe 객체 추가
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
