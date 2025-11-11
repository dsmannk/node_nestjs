"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
console.log('[TEST]', process.env.NODE_ENV);
console.log('[TEST]', process.env.SERVICE_URL);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    await app.listen(configService.get("SERVER_PORT"));
}
bootstrap();
//# sourceMappingURL=main.js.map