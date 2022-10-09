import { Application, Request } from 'express';
import { EventDataType } from '../../types';

export type RoutesInput = {
  app: Application;
};

interface TypedRequest<T> extends Request {
  body: T;
}
export type RequestEventType = TypedRequest<EventDataType[]>;
