import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './configs/config';
import { WeatherModule } from './weather/weather.module';

console.log('env : ' + process.env.NODE_ENV); // 기동 시 환경 변수 출력
console.log('current working directory : ' + process.cwd()); // 현재 디렉터리 출력

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`, // 환경 변수파일 경로 지정
          load: [config], // 커스텀 설정 파일 설정
          cache: true, // 캐시하기
          expandVariables: true, // 확장 변수 옵션 추가(이미 선언된 변수를 다른 변수에 ${변수명}으로 할당하는 기능
          //ignoreEnvFile: true, // 이걸 true로 해야 중복 로딩 안 함
      }), WeatherModule], // ConfigModule 설정 (전역 모듈 설정 추가)
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
