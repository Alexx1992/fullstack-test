import { execSync } from 'child_process';
import { join } from 'path';

import { RoutesInput, RequestEventType } from './types';
import dbClient from '../dbClient';

const TrackerRoutes = ({ app }: RoutesInput) => {
  app.get('/', (_, res) => {
    const jsFile = execSync(
      `node_modules/.bin/esbuild ${join(__dirname, '../../client/app.ts')}`,
      {
        encoding: 'utf-8',
      }
    );
    res.send(jsFile);
  });

  app.post('/track', (req: RequestEventType, res) => {
    res.sendStatus(200);

    if (req.body?.length) {
      const filteredevents = req.body.filter((item) => {
        const { event, tags, url, title, ts } = item;
        return event && tags && url && title && ts;
      });
      dbClient.addEvetns(filteredevents);
    }
  });
};

export default TrackerRoutes;
