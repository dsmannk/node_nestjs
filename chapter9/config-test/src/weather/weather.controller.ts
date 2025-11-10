import { Controller, Get } from '@nestjs/common';
import { ConfigService } from "@nestjs/config"; // ConfigService 임포트

@Controller('weather')
export class WeatherController {
    constructor(private configService: ConfigService) {} // 의존성 주입

    @Get()
    public getWeather(): string {
        // 환경 변숫값 가져오기

        // 내부 함수인 callWeatherAPI()를 호출
    }
}
