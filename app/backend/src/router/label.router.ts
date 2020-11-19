import { Router } from "express";
import { getLabels, createLabel, getLabel, deleteLabel, patchLabel, getTasksFromLabel } from "../controller/label.controller";

export const labelRouter = Router({ mergeParams: true });

/*
 * basic crud functions
 */
labelRouter.get('/', getLabels);

labelRouter.post('/', createLabel);

labelRouter.get('/:labelId', getLabel);

labelRouter.delete('/:labelId', deleteLabel);

labelRouter.patch('/:labelId', patchLabel);

/*
 * advanced functions
 */
labelRouter.get('/:labelId/tasks', getTasksFromLabel);
