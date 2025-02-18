import { Logger } from 'winston';
import app from '~config/app';
import logger from '~config/logger/logger';
const { PORT } = process.env;

declare global {
  var log: Logger;
}
global.log = logger;

// Crear Middleware para detectar que la tienda no este en status = 2; diabled for making thinks

app.listen(PORT, () => {
  log.info(`Server running on port ${PORT}`);
});
