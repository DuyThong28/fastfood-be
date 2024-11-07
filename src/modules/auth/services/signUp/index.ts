import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { ResendProvider } from 'src/common/providers/nodemailer.provider';
import { checkIsExistEmail } from './check-is-exist-user';
import { hashPassword } from 'prisma/seed';
import { createUserWithEmail } from './create-user';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { SignUpByEmailDto } from '../../dto/signup-dto';
import { EmailService } from 'src/modules/email/email.service';
@Injectable()
class SignUpService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private emailService: EmailService,
  ) {}
  public async SignUpByEmail(body: SignUpByEmailDto) {
    const { email, password } = body;
    const isExistedUser = await checkIsExistEmail(email, this.prisma);
    if (isExistedUser) {
      throw new BadRequestException('User already exists', {
        cause: new Error('User already exists'),
      });
    }
    const hashedPassword = await hashPassword(password);
    const new_user = await createUserWithEmail(
      { ...body, hashedPassword },
      this.prisma,
    );
    await this.prisma.vertifications.create({
      data: {
        verified_code: new_user.password,
        user: {
          connect: {
            id: new_user.id,
          },
        },
      },
    });
    const url = `${this.configService.get<string>('url_web')}/verification?token=${hashedPassword}`;
    await this.emailService.sendEmailVerify({
      to: new_user.email,
      subject: 'Verify your account',
      userFirstname: new_user.full_name,
      url: url,
    });
    return {
      message:
        'User created successfully, please check your email to verify your account',
    };
  }
}

export default SignUpService;
