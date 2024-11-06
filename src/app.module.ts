import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import Modules from './modules';
import { PrismaModule } from './modules/prisma/prisma.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development'],
      load: [configuration],
    }),
    PrismaModule,
    ...Modules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
