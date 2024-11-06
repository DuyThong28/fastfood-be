import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignInByEmailDto } from './dto/sign_in_by_email.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ROLE } from 'src/constants/enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async signInByEmail(signInByEmailDto: SignInByEmailDto) {
  }
  private async generateToken<T extends { id: string; role: ROLE }>(
    payload: T,
  ) {
    const jwtPayload = payload;
    const access_token = await this.jwtService.signAsync(jwtPayload, {
      secret: this.config.get('jwt_access_secret'),
      expiresIn: '300s',
    });
    const refresh_token = await this.jwtService.signAsync(jwtPayload, {
      secret: this.config.get('jwt_refresh_secret'),
      expiresIn: '10d',
    });
    return { access_token, refresh_token };
  }
}
