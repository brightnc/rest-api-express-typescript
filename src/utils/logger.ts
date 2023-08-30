import logger from "pino";
//import dayjs from 'dayjs';

const log = logger({
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  },
});

export default log;
