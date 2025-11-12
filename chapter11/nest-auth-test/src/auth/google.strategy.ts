import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Profile, Strategy, StrategyOptions } from "passport-google-oauth20";
import { User } from 'src/user/user.entity';
import { UserService } from "../user/user.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private userService: UserService) {
        // 부모 클래스의 생성자를 호출
        super({
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: 'http://localhost:3000/auth/google',
            scope: ['email', 'profile'],
        } as StrategyOptions);
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
        const { id, name, emails } = profile;
        console.log(accessToken);
        console.log(refreshToken);

        const providerId = id;
        const email = emails?.[0].value ?? null;
        const firstName = name?.familyName ?? '';
        const lastName = name?.givenName ?? '';

        console.log(providerId, email, firstName, lastName);

        // 유저 정보 저장 혹은 가져오기
        const user: User = await this.userService.findByEmailOrSave(
            email,
            firstName + lastName,
            providerId,
        )

        // 유저 정보 반환
        return user;
    }
}

