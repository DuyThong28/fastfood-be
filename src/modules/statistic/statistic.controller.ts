import { Controller, Post, Body } from '@nestjs/common';
import { createStatisticDto } from './dto/createStatistic.dto';
import { StatisticService } from './statistic.service';
import { Statistic } from '@prisma/client';
import { StandardResponse } from 'src/utils/response.dto';
import HttpStatusCode from 'src/constants/http_status_code';

@Controller('/statistics')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}
  @Post('/')
  async createDailyStatistic(
    @Body() createStatisticDto: createStatisticDto,
  ): Promise<StandardResponse<Statistic>> {
    const newStatistic =
      await this.statisticService.createDailyStatistic(createStatisticDto);
    const message = 'Create daily statistic successfully';
    return new StandardResponse(newStatistic, message, HttpStatusCode.CREATED);
  }
}
