import Target from "../models/target.js";
import TargetTerritory from "../models/target_territories.js";
import Area from "../models/area.js";
import Employees from "../models/employee.js";
import Designation from '../models/designation.js';

/* 
URL: api/v1/target
METHOD: POST
DESC: Create new target
*/
export const createTarget = async (req, res) => {
  const { t_emp_id, t_designation_id, tr_area_id, target_territories } = req.body;
  console.log(req.body);
  // Validate input
  if (!t_emp_id || !t_designation_id || !tr_area_id || !target_territories) {
    return res.status(400).json({
      status: "MISSING DATA ERROR",
      msg: "All fields are required",
    });
  }

  if (!Array.isArray(target_territories) || target_territories.length === 0) {
    return res.status(400).json({
      status: "EMPTY ARRAY ERROR",
      msg: "Territories must be a non-empty array",
    });
  }

  try {
    // Step 1: Create target
    const [targetId] = await Target.create({
      t_emp_id: t_emp_id,
      target_state: "active",
      t_designation_id: t_designation_id,
      tr_area_id: tr_area_id,
    });

    // Step 2: Associate territories with the target
    const targetTerritoryData = target_territories.map((territory) => ({
      tt_target_id: targetId,
      tt_territory_id: territory.territoryId,
      target_value: territory.target_value,
      target_type: territory.target_type,
      dynamic_value:territory.dynamic_value
    }));

    await TargetTerritory.create(targetTerritoryData);

    // Fetch the created target with associated territories
    const createdTarget = await Target.getById(targetId);
    const associatedTerritories = await TargetTerritory.getByTargetId(targetId);

    const target = {
      ...createdTarget,
      associatedTerritories,
    };
    return res.status(201).json({
      status: "SUCCESS",
      msg: "New Target Created Successfully",
      data: target,
    });
  } catch (error) {
    return res.status(500).json({
      status: "SERVER ERROR",
      msg: error.message,
    });
  }
};

/* 
URL: api/v1/target
METHOD: GET
DESC: Get all exist targets
*/
export const getTargets = async (req, res) => {
  try {
    const targets = await Target.getAll();
    if (!targets || targets.length === 0) {
      return res.status(400).json({
        status: "NO RECORDS",
        msg: "There are no records",
      });
    }
    
    // Use Promise.all to handle the asynchronous operations within the map function
    const targets_list = await Promise.all(
      targets.map(async (targetdata) => {
        let areaName;
        let employeeName;
        const target_territories = await TargetTerritory.getByTargetId(
          targetdata.targetId
        );
        const area = await Area.getById(targetdata.tr_area_id);
        console.log(area);
        area !== null ? areaName = area.area_name : null;
        const employee = await Employees.getById(targetdata.t_emp_id);
        employee !== null ? employeeName = employee.employee_name : null
        return {
          ...targetdata,
          areaName,
          employeeName,
          target_territories,
        };
      })
    );

    return res.status(200).json({
      status: "SUCCESS",
      msg: "Details of targets",
      data: targets_list,
    });
  } catch (error) {
    return res.status(500).json({
      status: "SERVER ERROR",
      msg: error.message,
    });
  }
};

/* 
URL: api/v1/target/active
METHOD: GET
DESC: Get all active targets
*/
export const getTargetsByStatus = async (req,res) => {
  try {
    const { status } = req.params;
    const targets = await Target.getTargetsByStatus(status);
    if (!targets || targets.length === 0) {
      return res.status(400).json({
        status: "NO RECORDS",
        msg: "There are no records",
      });
    }
    // Use Promise.all to handle the asynchronous operations within the map function
    const targets_list = await Promise.all(
      targets.map(async (data) => {
        let areaName;
        let employeeName;
        const target_territories = await TargetTerritory.getByTargetId(
          data.targetId
        );
        const area = await Area.getById(data.tr_area_id);
        area !== null ? (areaName = area.area_name) : null;
        const employee = await Employees.getById(data.t_emp_id);
        employee !== null ? (employeeName = employee.employee_name) : null;
        return {
          ...data,
          areaName,
          employeeName,
          target_territories,
        };
      })
    );

    return res.status(200).json({
      status: "SUCCESS",
      msg: "Details of active targets",
      data: targets_list,
    });
  } catch (error) {
    return res.status(500).json({
      status: "SERVER ERROR",
      msg: error.message,
    });
  }
};

/* 
URL: api/v1/target/:id
METHOD: GET
DESC: Get target by id
*/
export const getTargetById = async (req, res) => {
  try {
    const { id } = req.params;
    const target = await Target.getById(id);

    if (!target) {
      return res.status(400).json({
        status: "NOT FOUND",
        msg: "This target is not found",
      });
    }
    const employee = await Employees.getById(target.t_emp_id);
    const area = await Area.getById(target.tr_area_id);
    const designation = await Designation.getById(target.t_designation_id);
    console.log(area);
    const target_territories = await TargetTerritory.getByTargetId(
      target.targetId
    );
    const target_object = {
      ...target,
      designation: designation.designation_name,
      employeeName: employee.employee_name,
      areaName:area.area_name,
      target_territories,
    };
    return res.status(200).json({
      staus: "SUCCESS",
      msg: "Details of target based on given id",
      data: target_object,
    });
  } catch (error) {
    return res.status(500).json({
      status: "SERVER ERROR",
      msg: error.message,
    });
  }
};

/* 
URL: api/v1/target/:id
METHOD: PATCH
DESC: Update target by id
*/
export const updateTargetById = async (req, res) => {
  const { id } = req.params;
  const { t_emp_id, t_designation_id, tr_area_id, target_territories, target_state } = req.body;
  console.log(req.body);
  console.log(id);
  // Validate input
  if (!id || !t_emp_id || !t_designation_id || !tr_area_id || !target_territories || !target_state) {
    return res.status(400).json({
      status: "MISSING DATA ERROR",
      msg: "All fields are required",
    });
  }

  if (!Array.isArray(target_territories) || target_territories.length === 0) {
    return res.status(400).json({
      status: "EMPTY ARRAY ERROR",
      msg: "Territories must be a non-empty array",
    });
  }

  try {
    // Step 1: Update target
    await Target.update(id, {
      t_emp_id,
      target_state: target_state,
      t_designation_id,
      tr_area_id,
    });

    // Step 2: Fetch existing target_territory records
    const existingTerritories = await TargetTerritory.getByTargetId(id);

    // Step 3: Update or Insert target_territory records
    for (const territory of target_territories) {
      const existingTerritory = existingTerritories.find(
        (et) => et.territoryId === territory.territoryId
      );
      
      if (existingTerritory) {
        // Update existing territory
        console.log(territory);
        await TargetTerritory.update(id, territory.territoryId, {
          target_value: territory.target_value,
          target_type: territory.target_type,
          dynamic_value : territory.dynamic_value
        });
      } else {
        return res.status(404).json({
          status: "NOT FOUND",
          msg:"This territory is not found"
        })
      }
    }

    // Fetch the updated target with associated territories
    const updatedTarget = await Target.getById(id);
    const associatedTerritories = await TargetTerritory.getByTargetId(id);

    const target = {
      ...updatedTarget,
      associatedTerritories,
    };

    return res.status(200).json({
      status: "SUCCESS",
      msg: "Target Updated Successfully",
      data: target,
    });
  } catch (error) {
    return res.status(500).json({
      status: "SERVER ERROR",
      msg: error.message,
    });
  }
};

/* 
URL: api/v1/target/deactive/:id
METHOD: PATCH
DESC: Deactive target by id
*/
export const deactiveTargetById = async (req, res) => {
  try {
    const { id } = req.params; 
    const deactivatedTarget = await Target.delete(id);
    res.status(200).json({
      status: "SUCCESS",
      msg: "successfully removed the target",
      data:deactivatedTarget
    })
  } catch (error) {
    return res.status(500).json({
      status: "SERVER ERROR",
      msg: error.message,
    });
  }
}