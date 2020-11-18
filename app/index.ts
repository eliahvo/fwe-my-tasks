import bodyParser from 'body-parser';
import express from 'express';
import { globalRouter } from './src/router/global.router';
import { Helper } from './src/test/helper';
import { createDBconnection } from './src/util/createDatabaseConnection';
import { startTelegramBot } from './src/util/startTelegramBot';

export const startServer = async () => {
  try {
    const app = express();
    const port = 3000;
    
    await createDBconnection();

    app.use(bodyParser.json());
    app.use('/api', globalRouter);

    app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`);
    });

  }
  catch (e) {
    console.log(e);
    throw e;
  }
};

void startServer();
void startTelegramBot();