import Employees from "../models/employee.js";
import Designation from '../models/designation.js'
/* 
URL: api/v1/employees
METHOD: GET
DESC: Get All Employees
*/

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employees.getAll();
    const employeeList = await Promise.all(
      employees.map(async (data) => {
        const designation = await Designation.getById(data.designation_id);
        return {
          ...data,
          designation
        }
      })
    );
    
    if (employeeList.length != 0) {
      return res.status(200).json({
        status: "SUCCESS",
        msg: "Details Of Employees",
        data: employeeList
      });
    } else {
      return res.status(404).json({
        status: "NOT FOUND",
        msg: "recordes are not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "SERVER ERROR",
      msg: `${error.message}`,
    });
  }
};

/* 
URL: api/v1/employees/{id}
METHOD: GET
DESC: Get Employee By ID 
*/

export const getEmployeesById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employees.getById(id);
    const designation = await Designation.getById(employee.designation_id);
    
    if (employee) {
      return res.status(200).json({
        status: "SUCCESS",
        msg: `Details of ${employee.employee_name}`,
        data: {
          employee,
          designation
        },
      });
    } else {
      return res.status(404).json({
        status: "NOT FOUND",
        msg: "user not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "SERVER ERROR",
      msg: `${error.message}`,
    });
  }
};
