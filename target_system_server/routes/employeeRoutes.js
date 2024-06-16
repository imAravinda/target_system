import express from 'express';
import { getEmployees, getEmployeesById } from '../controllers/employeeController.js';

const employeeRoutes = express.Router();

employeeRoutes.route("").get(getEmployees);
employeeRoutes.route("/:id").get(getEmployeesById);

export default employeeRoutes;