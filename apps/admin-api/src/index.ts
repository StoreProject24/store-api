import { Logger } from 'winston';
import 'dotenv/config';
import { validateEnvironment, getEnv } from '~config/environment';
import app from '~config/app';
import logger from '~config/logger/logger';

declare global {
  var log: Logger;
}
global.log = logger;

// Validar variables de ambiente antes de iniciar
validateEnvironment();

const { PORT } = getEnv();

app.listen(PORT, () => {
  log.info(`✅ Server running on port ${PORT}`);
});
