import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { AtStrategyProvider } from 'src/common/providers/authenticate.provider';
import { RefreshTokenStrategyProvider } from 'src/common/providers/refreshtoken.provider';
import { NodemailerProvider } from 'src/common/providers/nodemailer.provider';
import {
  ForgotPwdService,
  RefreshTokenService,
  SignInService,
  SignOutService,
  SignUpService,
  VerificationEmailService,
} from './services';
import { EmailService } from '../email/email.service';

@Module({
  imports: [JwtModule.register({ global: true }), PrismaModule],
  controllers: [AuthController],
  providers: [
    SignInService,
    EmailService,
    SignUpService,
    VerificationEmailService,
    SignOutService,
    RefreshTokenService,
    ForgotPwdService,
    AtStrategyProvider,
    RefreshTokenStrategyProvider,
    NodemailerProvider,
  ],
  exports: [JwtModule],
})
export class AuthModule {}
