import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetEntityId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.body.entityId;
  },
);
