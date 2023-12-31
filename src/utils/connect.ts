import mongoose from "mongoose";
//import config from "config";
import "dotenv/config";
import logger from "./logger";

async function connect() {
  //const dbUri = config.get<string>('dbUri')
  const dbUri = process.env.DB_URI as string;
  try {
    await mongoose.connect(dbUri);
    logger.info("Connected to Database");
  } catch (error) {
    logger.fatal("Error connecting to database");
    process.exit(1);
  }
}

export default connect;
