import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ROLE } from 'src/constants/enum';

export type TUserSession = {
  id: string;
  role: ROLE;
};

export const UserSession = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const user: TUserSession = context.switchToHttp().getRequest()
      .user as TUserSession;
    return user;
  },
);
