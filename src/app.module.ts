import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import Modules from './modules';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development'],
      load: [configuration],
      ...Modules,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
