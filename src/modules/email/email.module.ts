import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';
import { NodemailerProvider } from 'src/common/providers/nodemailer.provider';

@Module({
  providers: [EmailService, NodemailerProvider],
  imports: [ConfigModule],
  exports: [EmailService],
})
export class EmailModule {}
