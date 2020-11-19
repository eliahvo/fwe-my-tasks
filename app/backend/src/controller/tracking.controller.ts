import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Task } from "../entity/Task";
import { Tracking } from "../entity/Tracking";

/**
 * returns a list of all trackings
 * @param _ Request object
 * @param res Response object
 */
export const getTrackings = async (_: Request, res: Response) => {
  const trackingRepository = await getRepository(Tracking);
  const trackings = await trackingRepository.find({relations: ["task"]});
  res.status(200).send({
    data: trackings
  });
};

/**
 * returns a single tracking
 * specify tracking by /:trackingId in the route
 * @param req Request object
 * @param res Response object
 */
export const getTracking = async (req: Request, res: Response) => {
  const trackingId = req.params.trackingId;
  const trackingRepository = await getRepository(Tracking);

  try {
    const tracking = await trackingRepository.findOneOrFail(trackingId, {relations: ["task"]});
    res.status(200).send({
      data: tracking
    });
  } catch (error) {
    res.status(404).send({
      status: 'tracking not found'
    });
  }
};

/**
 * deletes a single tracking
 * specify tracking by /:trackingId in the route
 * @param req Request object
 * @param res Response object
 */
export const deleteTracking = async (req: Request, res: Response) => {
  const trackingId = req.params.trackingId;
  const trackingRepository = await getRepository(Tracking);

  try {
    const tracking = await trackingRepository.findOneOrFail(trackingId);
    const id = tracking.trackingId;
    await trackingRepository.remove(tracking);
    res.status(200).send({
      id: id,
      data: tracking
    });
  } catch (error) {
    res.status(404).send({
      status: 'tracking not found'
    })
  }
};

/**
 * creates a single tracking
 * body must contain a description and taskId
 * @param req Request object
 * @param res Response object
 */
export const createTracking = async (req: Request, res: Response) => {
  const { description, taskId } = req.body;

  // check if description & taskId is set
  if (!description || !taskId) {
    res.status(400).send({
      status: 'parameter is missing'
    });
    return;
  }

  const tracking = new Tracking();
  tracking.description = description;
  const taskRepository = await getRepository(Task);

  await createTrackingInDatabase(tracking, taskRepository, taskId, res);
};

/**
 * updates a single tracking
 * specify tracking by /:trackingId in the route
 * body can contain a name
 * @param req Request object
 * @param res Response object
 */
export const patchTracking = async (req: Request, res: Response) => {
  const trackingId = req.params.trackingId;
  const { description, timeStart, timeEnd} = req.body;
  const trackingRepository = await getRepository(Tracking);

  try {
    let tracking = await trackingRepository.findOneOrFail(trackingId);
    tracking.description = description;
    tracking.timeStart = timeStart;
    tracking.timeEnd = timeEnd;

    tracking = await trackingRepository.save(tracking);

    res.status(200).send({
      data: tracking
    });
  } catch (error) {
    res.status(404).send({
      status: 'tracking not found'
    })
  }
};

/**
 * function that is called in createTracking and is extracted because of its complexity
 * @param tracking tracking
 * @param taskRepository repository of tasks from database
 * @param taskId id of the associated  task
 * @param res Response object
 */
 async function createTrackingInDatabase(tracking: Tracking, taskRepository, taskId: any, res: Response<any>) {
  try {
    tracking.task = await taskRepository.findOneOrFail(taskId);

    const trackingRepository = await getRepository(Tracking);
    const createdTracking = await trackingRepository.save(tracking);

    res.status(201).send({
      data: createdTracking
    });
  } catch (error) {
    res.status(404).send({
      err: error,
      status: 'task not found'
    });
  }
}
