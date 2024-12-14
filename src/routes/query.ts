import Router from "@koa/router";
import { validateRequestMiddleware } from "../middlewares/validate.request";
import { ask } from "../services/chatbot";
import Joi, { isError } from "joi";

const queryRouter = new Router();
const querySchema = Joi.object({
  query: Joi.string().required(),
  stream: Joi.boolean().optional(),
});

/**
 * @swagger
 * /query:
 *   post:
 *     summary: 질문 API
 *     tags:
 *       - query
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
 *                 example: "오늘 서울 날씨는 어때?"
 *               stream:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: 챗봇 응답
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: "서울의 현재 날씨는 맑음입니다."
 *       400:
 *         description: 요청 검증 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "\"data\" is required"
 *       401:
 *         description: 토큰 인증 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Jwt Header Missing"
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 *       502:
 *         description: API 호출 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
queryRouter.post(
  "/query",
  validateRequestMiddleware(querySchema),
  async (ctx) => {
    const { query, stream } = ctx.request.body;
    try {
      const response = stream ? ask(query, true) : await ask(query, false);
      ctx.body = stream ? response : { chatbot: response };
    } catch (error) {
      if (isError(error)) {
        ctx.status = 502;
        ctx.body = {
          error: error.message,
        };
      } else {
        ctx.status = 500;
        ctx.body = {
          error: "Unknown Error",
        };
      }
    }
  }
);

export default queryRouter;
