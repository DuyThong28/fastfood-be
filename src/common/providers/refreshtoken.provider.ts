import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_REFRESH_STRATEGY } from 'src/constants/constant';

@Injectable()
export class RefreshTokenStrategyProvider extends PassportStrategy(
  Strategy,
  JWT_REFRESH_STRATEGY,
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const rt = req.cookies['refresh_token'];
          if (!rt) return null;
          return rt;
        },
      ]),
      ignoreElements: false,
      secretOrKey: configService.get<string>('jwt_refresh_secret'),
    });
  }
  async validate(payload: any) {
    if (payload === null)
      new UnauthorizedException('Token not found', {
        cause: new Error('Token not found'),
      });
    return { id: payload.id, role: payload.role };
  }
}
