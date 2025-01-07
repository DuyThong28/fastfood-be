import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CartsService } from './cart.service';
import { OrdersModule } from '../order/order.module';
import { OrderService } from '../order/order.service';
import { ChatbotModule } from '../chatbot/chatbot.module';
import { GeminiModule } from '../gen_ai/gemini.module';

@Module({
  providers: [CartsService, OrderService],
  controllers: [CartController],
  imports: [PrismaModule, OrdersModule, ChatbotModule, GeminiModule],
  exports: [CartsService],
})
export class CartsModule {}
