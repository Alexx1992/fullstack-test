import { join } from 'path';
import { Request, Response } from 'express';

import { RoutesInput } from './types';

function getMainPage(_: Request, res: Response) {
  res.sendFile(join(__dirname, '../../client/index.html'));
}

const ClientRoutes = ({ app }: RoutesInput) => {
  app
    .get('/', getMainPage)
    .get('/1.html', getMainPage)
    .get('/2.html', getMainPage);
};

export default ClientRoutes;
