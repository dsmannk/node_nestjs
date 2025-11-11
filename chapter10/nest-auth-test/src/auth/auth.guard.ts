import { CanActivate, Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable() // Injectable이 있으니 프로바이더
export class LoginGuard implements CanActivate { // CanActivate 인터페이스 구현
    constructor(private authService: AuthService) {} // authServic를 주입받음

    async canActivate(context: any): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (request.cookes['login']) {
            return true;
        }

        if (!request.body.email || !request.body.password) {
            return false;
        }

        const user = await this.authService.validateUser(
            request.body.email,
            request.body.password,
        );

        if (!user) {
            return false;
        }

        request.user = user;
        return true;
    }
}