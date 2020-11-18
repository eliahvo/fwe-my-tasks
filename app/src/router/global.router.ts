import { Router, Request, Response } from 'express';
import { labelRouter } from './label.router';
import { taskRouter } from './task.router';
import { trackingRouter } from './tracking.router';

export const globalRouter = Router({ mergeParams: true });

globalRouter.get('/', async (_: Request, res: Response) => {
  res.status(200).send({ message: 'Hello from api' });
});

globalRouter.use('/tasks', taskRouter);
globalRouter.use('/labels', labelRouter);
globalRouter.use('/trackings', trackingRouter);