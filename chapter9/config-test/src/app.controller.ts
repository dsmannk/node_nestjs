import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // ConfigService 임포트
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private configService: ConfigService) {} // ConfigService 주입

  @Get()
  getHello(): string {
    const message = this.configService.get('MESSAGE'); // configService.get() 호출
    return message;
  }

  @Get('service-url') // http://localhost:3000/service-url
  getServiceUrl(): string | undefined {
      return this.configService.get('SERVICE_URL'); // SERVICE_URL 환경 변수 반환
  }

  @Get('db-info') // 라우팅 정보
  getInfo(): string | undefined {
      console.log(this.configService.get('logLevel')); // logLevel 터미널에 출력
      console.log(this.configService.get('apiVersion')) // apiVersion 터미널에 출력
      return this.configService.get('dbInfo'); // 웹브라우저에 dbInfo 표시
  }

  @Get('redis-info')
  getRedisInfo(): string {
      return `${this.configService.get('redis.host')}:${this.configService.get('redis.port')}`;
  }

  @Get('server-url')
  getServerUrl(): string | undefined {
      console.log(this.configService.get('SERVICE_URL')); // apiVersion 터미널에 출력
      return this.configService.get('SERVICE_URL'); // 확장 변수값 읽기
  }
}
