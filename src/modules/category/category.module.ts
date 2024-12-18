import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { ChatbotService } from '../chatbot/chatbot.service';

@Module({
  imports: [PrismaModule, ChatbotService],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoriesModule {}
