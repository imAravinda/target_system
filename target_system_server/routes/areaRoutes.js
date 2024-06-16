import express from 'express';
import { getAreaById, getAreas } from '../controllers/areaController.js';

const areaRoutes = express.Router();

areaRoutes.route("").get(getAreas);
areaRoutes.route("/:id").get(getAreaById);

export default areaRoutes;