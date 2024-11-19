import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { createStatisticDto } from './dto/createStatistic.dto';
import { StatisticService } from './statistic.service';
import { Products, Statistic } from '@prisma/client';
import { StandardResponse } from 'src/utils/response.dto';
import HttpStatusCode from 'src/constants/http_status_code';
import { StatisticPageOptionsDto } from './dto/getStatistics.dto';
import { PageResponseDto } from 'src/utils/page_response.dto';
import { PageResponseMetaDto } from 'src/utils/page_response_meta.dto';

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
  @Get('/')
  async getStatistics(
    @Query() query: StatisticPageOptionsDto,
  ): Promise<PageResponseDto<Statistic>> {
    const { statistics, itemCount } =
      await this.statisticService.getStatistics(query);
    const meta = new PageResponseMetaDto({
      pageOptionsDto: query,
      itemCount: itemCount,
    });
    return new PageResponseDto(statistics, meta);
  }
  @Get('/bestSeller')
  async getBestSellerProduct(): Promise<StandardResponse<Products[]>> {
    const bestSellerProduct =
      await this.statisticService.getBestSellerProduct();
    const message = 'Get best seller product successfully';
    return new StandardResponse(bestSellerProduct, message, HttpStatusCode.OK);
  }
}
