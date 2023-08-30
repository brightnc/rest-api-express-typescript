import express from "express";
//import config from "config";
import "dotenv/config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";

const app = express();
const port: number = parseInt(process.env.PORT as string, 10);

app.use(express.json());
app.use(deserializeUser);

app.listen(port, async () => {
  logger.info(`app is listening on port ${port} `);
  await connect();
  routes(app);
});
