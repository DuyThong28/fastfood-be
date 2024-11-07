import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export const NodemailerProvider = {
  provide: 'NODEMAILER',
  useFactory: (configService: ConfigService): Transporter => {
    const options: SMTPTransport.Options = {
      host: configService.get<string>('email_host'),
      port: configService.get<number>('email_port'),
      auth: {
        user: configService.get<string>('email_username'),
        pass: configService.get<string>('email_password'),
      },
    };
    return createTransport(options);
  },
  inject: [ConfigService],
};
