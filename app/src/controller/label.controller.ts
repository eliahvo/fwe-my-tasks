import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Label } from "../entity/Label";

/**
 * returns a list of all labels
 * @param _ Request object
 * @param res Response object
 */
export const getLabels = async (_: Request, res: Response) => {
  const labelRepository = await getRepository(Label);
  const labels = await labelRepository.find();

  res.status(200).send({
    data: labels
  });
};

/**
 * returns a single label
 * specify label by /:labelId in the route
 * @param req Request object
 * @param res Response object
 */
export const getLabel = async (req: Request, res: Response) => {
  const labelId = req.params.labelId;
  const labelRepository = await getRepository(Label);

  try {
    const label = await labelRepository.findOneOrFail(labelId);
    res.status(200).send({
      data: label
    });
  } catch (error) {
    res.status(404).send({
      status: 'label not found'
    });
  }
};

/**
 * deletes a single label
 * specify label by /:labelId in the route
 * @param req Request object
 * @param res Response object
 */
export const deleteLabel = async (req: Request, res: Response) => {
  const labelId = req.params.labelId;
  const labelRepository = await getRepository(Label);

  try {
    const label = await labelRepository.findOneOrFail(labelId);
    const id = label.labelId;
    await labelRepository.remove(label);
    res.status(200).send({
      id: id,
      data: label
    });
  } catch (error) {
    res.status(404).send({
      status: 'label not found'
    })
  }
};

/**
 * creates a single label
 * body must contain a name
 * @param req Request object
 * @param res Response object
 */
export const createLabel = async (req: Request, res: Response) => {
  const {name} = req.body;

  // check if name is set
  if (!name) {
    res.status(400).send({
      status: 'parameter is missing'
    });
    return;
  }

  const label = new Label();
  label.name = name;

  const labelRepository = await getRepository(Label);
  const createdlabel = await labelRepository.save(label);

  res.status(201).send({
    data: createdlabel
  });
};

/**
 * updates a single label
 * specify label by /:labelId in the route
 * body can contain a name
 * @param req Request object
 * @param res Response object
 */
export const patchLabel = async (req: Request, res: Response) => {
  const labelId = req.params.labelId;
  const {name} = req.body;
  const labelRepository = await getRepository(Label);

  try {
    let label = await labelRepository.findOneOrFail(labelId);
    label.name = name;

    label = await labelRepository.save(label);

    res.status(200).send({
      data: label
    });
  } catch (error) {
    res.status(404).send({
      status: 'label not found',
    })
  }
};

/**
 * returns a list of tasks from a specific label
 * specify label by /:labelId in the route
 * @param req Request object
 * @param res Response object
 */
export const getTasksFromLabel = async (req: Request, res: Response) => {
  const labelId = req.params.labelId;
  const labelRepository = await getRepository(Label);

  try {
    const label = await labelRepository.findOneOrFail(labelId);
    const labelTasks = await label.tasks;

    res.status(200).send({
      data: labelTasks
    });
  } catch (error) {
    res.status(404).send({
      err: error,
      status: 'label not found'
    });
  }
}