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
    const { query, stream } = ctx.request.body;
    try {
      const response = stream ? ask(query, true) : await ask(query, false);
      ctx.body = stream ? response : { chatbot: response };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        error: "Internal Server Error",
      };
    }
  }
);

export default queryRouter;
