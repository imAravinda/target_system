import express from 'express';
import { createTarget, deactiveTargetById, getTargetById, getTargets, getTargetsByStatus, updateTargetById } from '../controllers/targetController.js';

const targetRoutes = express.Router();

targetRoutes.route("").post(createTarget);
targetRoutes.route("").get(getTargets);
targetRoutes.route("/:id").get(getTargetById);
targetRoutes.route("/:id").patch(updateTargetById);
targetRoutes.route("/active-targets/:status").get(getTargetsByStatus);
targetRoutes.route("/deactive/:id").patch(deactiveTargetById);

export default targetRoutes;