import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import dialogflow from '@google-cloud/dialogflow';
import { StatisticService } from '../statistic/statistic.service';
import { requestMessageDto } from './dto/requestMessage.dto';

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const PROJECTID = CREDENTIALS.project_id;

const CONFIGURATION = {
  credentials: {
    private_key: CREDENTIALS['private_key'],
    client_email: CREDENTIALS['client_email'],
  },
};

const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

const entityCategoryId =
  'projects/agent/fastfood-egpp/editEntity/70907846-7225-4e48-abb3-8bbfb4d8d7dd';
const entityTypesClient = new dialogflow.EntityTypesClient(CONFIGURATION);

const entityOrderIdId =
  'projects/agent/fastfood-egpp/editEntity/2b4a5a53-93ea-4dee-a7fc-478ec440f19a';

@Injectable()
export class ChatbotService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly statisticService: StatisticService,
  ) {}
  async chatbot(requestMessageDto: requestMessageDto) {
    try {
      const message = requestMessageDto.message;
      const sessionId = uuidv4();

      const sessionPath = sessionClient.projectAgentSessionPath(
        PROJECTID,
        sessionId,
      );

      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: message,
            languageCode: 'vi',
          },
        },
      };

      const responses = await sessionClient.detectIntent(request);
      const result = responses[0].queryResult;

      if (result.fulfillmentText === 'Best Seller') {
        const response =
          'Chào bạn! FoodzyBot rất vui được giúp bạn tìm món ăn ngon nhé. Hiện tại, các món ăn được khách hàng của chúng mình yêu thích nhất là:';
        const data = await this.statisticService.getBestSellerProduct();
        return { response, data };
      }

      if (result.fulfillmentText.substring(0, 8) === 'Category') {
        const category = result.fulfillmentText.substring(10);
        const response = `Chào bạn! FoodzyBot sẽ gợi ý cho bạn một số ${category} hot nhất nhé!`;
        const data = await this.prismaService.products.findMany({
          orderBy: [{ sold_quantity: 'desc' }],
          take: 5,
          where: {
            status: 'ACTIVE',
            Category: {
              name: category,
            },
          },
        });
        return { response, data };
      }

      const response = result.fulfillmentText;
      const data = null;
      return { response, data };
    } catch (err) {
      throw new Error(`Error in chatbot: ${err.message}`);
    }
  }

  async updateEntityCategory(category: string, synonyms: string[]) {
    try {
      const [entityType] = await entityTypesClient.getEntityType({
        name: entityCategoryId,
      });

      const newEntityValue = category;

      const existingValues = entityType.entities.map((entity) => entity.value);
      if (existingValues.includes(newEntityValue)) {
        return;
      }

      entityType.entities.push({
        value: newEntityValue,
        synonyms: synonyms,
      });

      const updateEntityRequest = {
        entityType: entityType,
      };

      await entityTypesClient.updateEntityType(updateEntityRequest);
    } catch (err) {
      throw new Error(err.message);
    }
  }
  async updateEntityOrderId(orderId: string) {
    try {
      const [entityType] = await entityTypesClient.getEntityType({
        name: entityOrderIdId,
      });

      const newEntityValue = orderId;

      const existingValues = entityType.entities.map((entity) => entity.value);
      if (existingValues.includes(newEntityValue)) {
        return;
      }

      entityType.entities.push({
        value: newEntityValue,
        synonyms: [orderId],
      });

      const updateEntityRequest = {
        entityType: entityType,
      };

      await entityTypesClient.updateEntityType(updateEntityRequest);
    } catch (err) {
      throw new Error(err.message);
    }
  }
  async deleteEntityOrderId(orderId: string) {
    try {
      const [entityType] = await entityTypesClient.getEntityType({
        name: entityOrderIdId,
      });

      const existingValues = entityType.entities.map((entity) => entity.value);

      if (existingValues.includes(orderId)) {
        const entityIndex = entityType.entities.findIndex(
          (entity) => entity.value === orderId,
        );

        entityType.entities.splice(entityIndex, 1);
      }

      const updateEntityRequest = {
        entityType: entityType,
      };

      await entityTypesClient.updateEntityType(updateEntityRequest);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
