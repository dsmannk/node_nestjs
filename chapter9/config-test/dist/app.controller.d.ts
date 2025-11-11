import { ConfigService } from '@nestjs/config';
export declare class AppController {
    private configService;
    constructor(configService: ConfigService);
    getHello(): string;
    getServiceUrl(): string | undefined;
    getInfo(): string | undefined;
    getRedisInfo(): string;
    getServerUrl(): string | undefined;
}
