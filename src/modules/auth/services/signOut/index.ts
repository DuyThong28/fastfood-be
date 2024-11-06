import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
class SignOutService {
  constructor(private readonly prisma: PrismaService) {}
  async signOut(req: any, res: Response) {
    const { refresh_token } = req.cookies;
    if (!refresh_token) {
      throw new UnauthorizedException('Token not found', {
        cause: new Error('Token not found'),
      });
    }
    const user = await this.prisma.users.findFirst({
      where: {
        refresh_token: refresh_token,
      },
    });
    if (!user) {
      throw new BadRequestException('Token have not in database', {
        cause: new Error('Token have not in database'),
      });
    }
    await this.prisma.users.updateMany({
      where: { refresh_token: refresh_token },
      data: { refresh_token: null },
    });
    res.clearCookie('refresh_token');
    return {
      message: 'Sign out successfully',
    };
  }
}
export default SignOutService;
