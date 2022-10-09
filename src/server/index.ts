import express, { Application } from 'express';
import cors from 'cors';
import dbClient from './dbClient';

import ClientRoutes from './routes/client';
import TrackerRoutes from './routes/tracker';

const appClient: Application = express();
const appTracker: Application = express();

const CLIENT_PORT = 8000;
const TRACKER_PORT = 8001;

appTracker.use(express.json());
appTracker.use(
  cors({ origin: 'http://localhost:8000', methods: 'POST', maxAge: 500 })
);

ClientRoutes({ app: appClient });
TrackerRoutes({ app: appTracker });

dbClient
  .connect()
  .then(() => {
    appClient.listen(CLIENT_PORT, () => {
      console.log(`Server client is running on ${CLIENT_PORT}`);
    });

    appTracker.listen(TRACKER_PORT, () => {
      console.log(`Server tracker is running on ${TRACKER_PORT}`);
    });
  })
  .catch(() => {
    process.exit();
  });
