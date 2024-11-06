import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
class RefreshTokenService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async getRefreshToken(req: any, res: Response) {
    const { refresh_token } = req.cookies;
    if (!refresh_token) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const user = await this.prisma.users.findFirst({
      where: {
        refresh_token: refresh_token,
      },
      select: {
        id: true,
        role: true,
      },
    });
    if (!user) {
      res.clearCookie('refresh_token');
      throw new UnauthorizedException('Invalid refresh token');
    }
    const jwts = await this.generateToken({ id: user.id, role: user.role });
    await this.prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        refresh_token: jwts.refresh_token,
      },
    });
    res.cookie('refresh_token', jwts.refresh_token, {
      httpOnly: true,
      sameSite: 'lax',
    });
    return { access_token: jwts.access_token };
  }
  private async generateToken<T extends { id: string; role: Role }>(
    payload: T,
  ) {
    {
      const jwtPayload = payload;
      const access_token = await this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get('jwt_access_secret'),
        expiresIn: '300s',
      });
      const refresh_token = await this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get('jwt_refresh_secret'),
        expiresIn: '10d',
      });
      return { access_token, refresh_token };
    }
  }
}
export default RefreshTokenService;
