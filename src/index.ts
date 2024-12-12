import Koa from "koa";
import bodyParser from "koa-body";
import router from "./router";
import dotenv from "dotenv";

dotenv.config();
const app = new Koa();
const PORT = process.env.PORT || 3000;

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT, () => {
  console.log(`${PORT}포트에서 챗봇 서버 실행 중`);
});
