import Router from "@koa/router";
import { validateRequestMiddleware } from "../middlewares/validate.request";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { config } from "../config";

const authRouter = new Router();
const authSchema = Joi.object({
  userId: Joi.string().required(),
});

/**
 * @swagger
 * /auth:
 *  post:
 *    summary: 인증 토큰 생성 API
 *    tags:
 *      - auth
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userId:
 *                type: string
 *                example: "tester"
 *    responses:
 *      200:
 *        description: 성공적으로 토큰이 생성됨
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *      400:
 *        description: 요청 검증 오류
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "\"data\" is required"
 *      500:
 *        description: 토큰 생성 오류
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "Jwt Sign Error"
 */
authRouter.post("/auth", validateRequestMiddleware(authSchema), async (ctx) => {
  const { userId } = ctx.request.body;
  try {
    const token = jwt.sign({ userId }, config.JWT_SECRET_KEY, {
      expiresIn: config.JWT_EXPIRES_IN,
    });
    ctx.body = { token };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Jwt Sign Error" };
  }
});

export default authRouter;
