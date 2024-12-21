import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { OrdersController } from './order.controller';
import { OrderService } from './order.service';
import { ChatbotModule } from '../chatbot/chatbot.module';

@Module({
  imports: [PrismaModule, ChatbotModule],
  providers: [OrderService],
  controllers: [OrdersController],
  exports: [OrderService],
})
export class OrdersModule {}
