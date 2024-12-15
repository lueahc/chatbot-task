import Router from "@koa/router";
import authRouter from "./routes/auth";
import queryRouter from "./routes/query";
import { jwtAuthMiddleware } from "./middlewares/jwt.auth";

const router = new Router();

router.use(authRouter.routes());
router.use(authRouter.allowedMethods());
router.use(jwtAuthMiddleware, queryRouter.routes());
router.use(jwtAuthMiddleware, queryRouter.allowedMethods());

export default router;
