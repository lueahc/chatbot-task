import jwt from "jsonwebtoken";
import { Middleware } from "koa";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET_KEY || "jwt_secret_key";

export const jwtAuthMiddleware: Middleware = async (ctx, next) => {
  const header = ctx.headers["authorization"];
  if (!header) {
    ctx.status = 401;
    ctx.body = { error: "Jwt Header Missing" };
    return;
  }

  const token = header.split(" ")[1];
  if (!token) {
    ctx.status = 401;
    ctx.body = { error: "Jwt Token Missing" };
    return;
  }

  try {
    ctx.state.user = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    ctx.status = 401;
    ctx.body = { error: "Invalid Token" };
    return;
  }

  await next();
};
