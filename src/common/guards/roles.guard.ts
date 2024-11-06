import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    const { user, route, method, headers } = context
      .switchToHttp()
      .getRequest();

    if (isPublic) {
      return true;
    }
    if (
      headers.accept == 'text/event-stream' &&
      headers.authorization &&
      user
    ) {
      return true;
    }
    const role = await this.prisma.roles.findFirst({
      where: {
        role_name: user.role,
      },
    });
    const permission = await this.prisma.permissions.findFirst({
      where: {
        role_id: role.id,
        api: route.path,
        method,
      },
    });
    if (!permission)
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    return true;
  }
}
