import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard {
  async canActive(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }
}
