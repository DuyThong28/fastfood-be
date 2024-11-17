import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createStatisticDto } from './dto/createStatistic.dto';
import { v4 as uuidv4 } from 'uuid';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class StatisticService {
  constructor(private readonly prismaService: PrismaService) {}

  async createDailyStatistic(createStatisticDto: createStatisticDto) {
    try {
      const { day, month, year } = createStatisticDto;
      const start = new Date(year, month - 1, day);
      const end = new Date(year, month - 1, day + 1);
      const totalOrder = await this.prismaService.orders.count({
        where: {
          updated_at: {
            gte: start,
            lt: end,
          },
          status: 'SUCCESS',
        },
      });
      const totalRevenue = await this.prismaService.orders.groupBy({
        by: ['status'],
        _sum: { total_price: true },
        where: {
          updated_at: {
            gte: start,
            lt: end,
          },
          status: 'SUCCESS',
        },
      });
      const newStatistic = await this.prismaService.statistic.create({
        data: {
          id: uuidv4(),
          day: day,
          month: month,
          year: year,
          total_order: totalOrder,
          total_revenue: totalRevenue[0]._sum.total_price,
        },
      });
      return newStatistic;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Cron('0 59 23 * * *')
  async scheduleDailyStatistics() {
    try {
      const today = new Date();
      const todayStart = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );
      const todayEnd = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1,
      );
      const totalOrder = await this.prismaService.orders.count({
        where: {
          updated_at: {
            gte: todayStart,
            lt: todayEnd,
          },
          status: 'SUCCESS',
        },
      });
      const totalRevenue = await this.prismaService.orders.groupBy({
        by: ['status'],
        _sum: { total_price: true },
        where: {
          updated_at: {
            gte: todayStart,
            lt: todayEnd,
          },
          status: 'SUCCESS',
        },
      });
      const newStatistic = await this.prismaService.statistic.create({
        data: {
          id: uuidv4(),
          day: today.getDate(),
          month: today.getMonth() + 1,
          year: today.getFullYear(),
          total_order: totalOrder,
          total_revenue: totalRevenue[0]._sum.total_price,
        },
      });
      return newStatistic;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
