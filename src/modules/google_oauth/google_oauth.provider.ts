import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { GOOGLE_STRATEGY } from 'src/constants/constant';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(
  Strategy,
  GOOGLE_STRATEGY,
) {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('client_id'),
      clientSecret: configService.get<string>('client_secret'),
      callbackURL: configService.get<string>('redirect_url'),
      scope: ['email', 'profile', 'openid'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const user = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      profile: profile,
    };
    return done(null, user);
  }
}
