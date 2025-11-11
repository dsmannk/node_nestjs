import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

// const env = dotenv.config({
//     path: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`,
// });
// dotenvExpand.expand(env);

console.log('[TEST]', process.env.NODE_ENV);
console.log('[TEST]', process.env.SERVICE_URL);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService); // ConfigService를 app.get()에 추가
  // await app.listen(process.env.PORT ?? 3000);
  await app.listen(configService.get<number>("SERVER_PORT")!); // configService 사용 (!는 “undefined가 아니다라는 연산자)
}
bootstrap();
