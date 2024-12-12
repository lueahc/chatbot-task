import Router from "@koa/router";
import { validateRequestMiddleware } from "../middlewares/validate.request";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();
const authRouter = new Router();
const SECRET_KEY = process.env.JWT_SECRET_KEY || "jwt_secret_key";
const EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const authSchema = Joi.object({
  userId: Joi.string().required(),
});

authRouter.post("/auth", validateRequestMiddleware(authSchema), async (ctx) => {
  const { userId } = ctx.request.body;
  try {
    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: EXPIRES_IN });
    ctx.body = { token };
    return;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Jwt Sign Error" };
    return;
  }
});

export default authRouter;
