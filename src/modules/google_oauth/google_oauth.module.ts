import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { GoogleOauthController } from './google_oauth.controller';
import { GoogleOauthStrategy } from './google_oauth.provider';
import { GoogleOauthService } from './google_oauth.service';

@Module({
  controllers: [GoogleOauthController],
  providers: [GoogleOauthStrategy, GoogleOauthService],
  imports: [JwtModule.register({ global: true }), PrismaModule],
})
export class GoogleOauthModule {}
