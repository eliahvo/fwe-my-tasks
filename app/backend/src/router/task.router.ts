import { Router } from "express";
import { addLabelsToTask, createTask, deleteLabelsFromTask, deleteTask, getTask, getTasks, patchTask, getLabelsFromTask, getTrackingsFromTask } from "../controller/task.controller";

export const taskRouter = Router({ mergeParams: true });

/*
 * basic crud functions
 */
taskRouter.get('/', getTasks);

taskRouter.post('/', createTask);

taskRouter.get('/:taskId', getTask);

taskRouter.delete('/:taskId', deleteTask);

taskRouter.patch('/:taskId', patchTask);

/*
 * advanced functions
 */
taskRouter.post('/:taskId/labels', addLabelsToTask);

taskRouter.delete('/:taskId/labels', deleteLabelsFromTask);

taskRouter.get('/:taskId/labels', getLabelsFromTask);

taskRouter.get('/:taskId/trackings', getTrackingsFromTask);