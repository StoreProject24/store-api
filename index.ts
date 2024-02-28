import { Logger } from "winston";
import app from "@config/app";
import logger from "@config/logger/logger";
const { PORT } = process.env;

declare global {
  var log: Logger;
}
global.log = logger;

app.listen(PORT, () => {
  log.info(`Server running on port ${PORT}`);
});