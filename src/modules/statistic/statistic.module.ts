import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [PrismaModule, ScheduleModule.forRoot()],
  controllers: [StatisticController],
  providers: [StatisticService],
})
export class StatisticModule {}
