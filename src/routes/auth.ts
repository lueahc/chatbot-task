import Router from "@koa/router";
import { validateRequestMiddleware } from "../middlewares/validate.request";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Joi from "joi";
import { config } from "../config";

const authRouter = new Router();
const authSchema = Joi.object({
  userId: Joi.string().required(),
});

authRouter.post("/auth", validateRequestMiddleware(authSchema), async (ctx) => {
  const { userId } = ctx.request.body;
  try {
    const token = jwt.sign({ userId }, config.JWT_SECRET_KEY, {
      expiresIn: config.JWT_EXPIRES_IN,
    });
    ctx.body = { token };
    return;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Jwt Sign Error" };
    return;
  }
});

export default authRouter;
