import { AuthModule } from './auth/auth.module';
import { FoodModule } from './food/food.module';
import { HealthModule } from './health_checks/health_check.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';

const Modules = [
  HealthModule,
  AuthModule,
  FoodModule,
  ReviewModule,
  UserModule,
];
export default Modules;
