import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { VerificationEmailDto } from '../../dto/verify_account.dto';

@Injectable()
class VerificationEmailService {
  constructor(private prisma: PrismaService) {}
  async verificationEmail(body: VerificationEmailDto) {
    const { token } = body;
    const user = await this.prisma.users.findFirst({
      where: {
        password: token,
      },
    });
    if (!user) {
      throw new BadRequestException('Invalid token');
    }
    await this.prisma.vertifications.update({
      where: {
        user_id: user.id,
        verified_code: token,
      },
      data: {
        is_active: true,
      },
    });
    return {
      message: 'Email verified successfully',
    };
  }
}
export default VerificationEmailService;
