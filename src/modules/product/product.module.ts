import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductsController } from './product.controller';
import { ProductsService } from './product.service';
import { CategoriesModule } from '../category/category.module';
import { ChatbotModule } from '../chatbot/chatbot.module';

@Module({
  imports: [PrismaModule, CategoriesModule, ChatbotModule],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
