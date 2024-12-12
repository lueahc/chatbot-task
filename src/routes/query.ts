import Router from "@koa/router";
import { validateRequestMiddleware } from "../middlewares/validate.request";
import { ask } from "../services/chatbot";
import Joi from "joi";

const queryRouter = new Router();
const querySchema = Joi.object({
  query: Joi.string().required(),
  stream: Joi.boolean().optional(),
});

queryRouter.post(
  "/query",
  validateRequestMiddleware(querySchema),
  async (ctx) => {
    try {
      const { query, stream } = ctx.request.body;
      if (stream) {
        const response = ask(query, stream);
        ctx.body = response;
      } else {
        const response = await ask(query, stream);
        ctx.body = { chatbot: response };
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        error: error instanceof Error ? error.message : "Internal Server Error",
      };
    }
  }
);

export default queryRouter;
