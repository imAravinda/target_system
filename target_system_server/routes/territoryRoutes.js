import express from "express";
import { getTerritories, getTerritoriesByArea, getTerritoryById } from "../controllers/terrirtoryController.js";

const territoryRoutes = express.Router();

territoryRoutes.route("").get(getTerritories);
territoryRoutes.route("/:id").get(getTerritoryById);
territoryRoutes.route("/area/:id").get(getTerritoriesByArea);

export default territoryRoutes;
