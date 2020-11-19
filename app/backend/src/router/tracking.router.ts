import { Router } from "express";
import { createTracking, deleteTracking, getTracking, getTrackings, patchTracking } from "../controller/tracking.controller";

export const trackingRouter = Router({ mergeParams: true });

/*
 * basic crud functions
 */
trackingRouter.get('/', getTrackings);

trackingRouter.post('/', createTracking);

trackingRouter.get('/:trackingId', getTracking);

trackingRouter.delete('/:trackingId', deleteTracking);

trackingRouter.patch('/:trackingId', patchTracking);
