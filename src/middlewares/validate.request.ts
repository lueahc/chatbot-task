import Joi from "joi";
import { Middleware } from "koa";

export const validateRequestMiddleware = (
  schema: Joi.ObjectSchema
): Middleware => {
  return async (ctx, next) => {
    const validation = schema.validate(ctx.request.body);
    if (validation.error) {
      ctx.status = 400;
      ctx.body = { error: validation.error.message };
      return;
    }
    await next();
  };
};
