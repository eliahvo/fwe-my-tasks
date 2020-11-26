import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Label } from "../entity/Label";
import { Task } from "../entity/Task";

/**
 * returns a list of all tasks
 * @param req Request object
 * @param res Response object
 */
export const getTasks = async (req: Request, res: Response) => {
  const { labelFilter, taskNameFilter, taskDescriptionFilter } = req.query;
  const taskRepository = await getRepository(Task);
  const tasks = await taskRepository.find({ relations: ['labels', 'trackings'] });

  let results = [...tasks];
  if (labelFilter) {
    const labelFilterList = labelFilter.toString().split("; ");
    results = results.filter(r => (r.labels.some((val) => labelFilterList.indexOf(val.name) !== -1)));
  }
  if (taskNameFilter) {
    results = results.filter(r => r.name === taskNameFilter);
  }
  if (taskDescriptionFilter) {
    results = results.filter(r => r.description.includes(taskDescriptionFilter.toString()));
  }

  res.status(200).send({
    data: results
  });
};

/**
 * returns a single task
 * specify task by /:taskId in the route
 * @param req Request object
 * @param res Response object
 */
export const getTask = async (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  const taskRepository = await getRepository(Task);

  try {
    const task = await taskRepository.findOneOrFail(taskId, { relations: ['labels', 'trackings'] });
    res.status(200).send({
      data: task
    });
  } catch (error) {
    res.status(404).send({
      status: 'task not found'
    });
  }
};

/**
 * deletes a single task
 * specify task by /:taskId in the route
 * @param req Request object
 * @param res Response object
 */
export const deleteTask = async (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  const taskRepository = await getRepository(Task);

  try {
    const task = await taskRepository.findOneOrFail(taskId);
    const id = task.taskId;
    await taskRepository.remove(task);
    res.status(200).send({
      id: id,
      data: task
    });
  } catch (error) {
    res.status(404).send({
      status: 'task not found',
    })
  }
};

/**
 * creates a single task
 * body must contain a name and description
 * @param req Request object
 * @param res Response object
 */
export const createTask = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  // check if name and description is set
  if (!name || !description) {
    res.status(400).send({
      status: 'parameter is missing'
    });
    return;
  }

  const task = new Task();
  task.name = name;
  task.description = description;

  const taskRepository = await getRepository(Task);
  const createdTask = await taskRepository.save(task);

  res.status(201).send({
    data: createdTask,
  });
};

/**
 * updates a single task
 * specify task by /:taskId in the route
 * body can contain a name and/or description
 * @param req Request object
 * @param res Response object
 */
export const patchTask = async (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  const { name, description } = req.body;
  const taskRepository = await getRepository(Task);

  try {
    let task = await taskRepository.findOneOrFail(taskId);
    task.name = name;
    task.description = description;

    task = await taskRepository.save(task);

    res.status(200).send({
      data: task,
    });
  } catch (error) {
    res.status(404).send({
      status: 'task not found',
    })
  }
};

/**
 * adds a list of labels to a single task
 * specify task by /:taskId in the route
 * body must contain a labelIdList
 * @param req Request object
 * @param res Response object
 */
export const addLabelsToTask = async (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  const { labelIdList } = req.body;
  const taskRepository = await getRepository(Task);

  // check if labelIdList is set
  if (!labelIdList) {
    res.status(400).send({
      status: 'parameter is missing'
    });
    return;
  }

  try {
    let task: Task = await taskRepository.findOneOrFail(taskId);
    const taskLabels = await task.labels;
    const labelRepository = await getRepository(Label);

    task = await addLabelsToDatabase(labelIdList, labelRepository, taskLabels, task, taskRepository);
    res.status(200).send({
      status: 'labels added'
    });
  } catch (error) {
    res.status(404).send({
      status: 'task not found'
    });
  }
};


/**
 * deletes a list of labels from a single task
 * body must contain a labelIdList
 * @param req Request object
 * @param res Response object
 */
export const deleteLabelsFromTask = async (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  const { labelIdList } = req.body;
  const taskRepository = await getRepository(Task);

  // check if labelIdList is set
  if (!labelIdList) {
    res.status(400).send({
      status: 'parameter is missing'
    });
    return;
  }

  try {
    let task: Task = await taskRepository.findOneOrFail(taskId);
    let taskLabels = await task.labels;

    task = await deleteLabelsFromDatabase(taskLabels, labelIdList, task, taskRepository);

    res.status(200).send({
      status: 'labels deleted'
    });
  } catch (error) {
    res.status(404).send({
      err: error,
      status: 'task not found'
    });
  }
};

/**
 * returns a list of all labels from a task
 * specify task by /:taskId/labels in the route
 * @param _ Request object
 * @param res Response object
 */
export const getLabelsFromTask = async (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  const taskRepository = await getRepository(Task);

  try {
    const task: Task = await taskRepository.findOneOrFail(taskId, { relations: ['labels'] });
    const taskLabels = await task.labels;

    res.status(200).send({
      data: taskLabels
    });
  } catch (error) {
    res.status(404).send({
      err: error,
      status: 'task not found'
    });
  }
}

/**
 * returns a list of all trackings from a task
 * specify task by /:taskId/trackings in the route
 * @param _ Request object
 * @param res Response object
 */
export const getTrackingsFromTask = async (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  const taskRepository = await getRepository(Task);

  try {
    const task: Task = await taskRepository.findOneOrFail(taskId);
    const taskTrackings = await task.trackings;

    res.status(200).send({
      data: taskTrackings
    });
  } catch (error) {
    res.status(404).send({
      err: error,
      status: 'task not found'
    });
  }
}

/**
 * function that is called in deleteLabelsFromTask and is extracted because of its complexity
 * @param taskLabels list of labels from task
 * @param labelIdList list of labels which will be removed from task
 * @param task task 
 * @param taskRepository repository of tasks from database
 */
async function deleteLabelsFromDatabase(taskLabels: Label[], labelIdList: any, task: Task, taskRepository) {
  taskLabels = taskLabels.filter((label) => !labelIdList.includes(label.labelId));

  task.labels = taskLabels;

  task = await taskRepository.save(task);
  return task;
}

/**
 * function that is called in addLabelsToTask and is extracted because of its complexity
 * @param labelIdList list of labels which will be removed from task
 * @param labelRepository repository of labels from database
 * @param taskLabels list of labels from task
 * @param task task
 * @param taskRepository repository of tasks from database
 */
async function addLabelsToDatabase(labelIdList: any, labelRepository, taskLabels: Label[], task: Task, taskRepository) {
  for (let i = 0; i < Object.keys(labelIdList).length; i += 1) {
    const labelId: number = labelIdList[i];
    const label = await labelRepository.findOneOrFail(labelId);

    taskLabels.push(label);

    task = await taskRepository.save(task);
  }
  return task;
}
