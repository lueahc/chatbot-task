import Koa from "koa";
import bodyParser from "koa-body";
import router from "./router";
import { config } from "./config";

const app = new Koa();
const PORT = config.PORT || 3000;

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(config.PORT, () => {
  console.log(`${PORT}포트에서 챗봇 서버 실행 중`);
});
