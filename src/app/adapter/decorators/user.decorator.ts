import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();

  if (req.user) {
    return req.user;
  }
  return null;
});

export interface UserMetaData {
  userId: string;
  email: string;
  role: string;
}
