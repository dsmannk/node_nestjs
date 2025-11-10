import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), WeatherModule], // ConfigModule 설정 (전역 모듈 설정 추가)
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
