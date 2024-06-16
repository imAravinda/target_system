import Area from "../models/area.js";

/* 
URL: api/v1/areas
METHOD: GET
DESC: Get All Areas
*/

export const getAreas = async (req, res) => {
  try {
    const areas = await Area.getAll();
    if (areas) {
      return res.status(200).json({
        status: "SUCCESS",
        msg: "Details Of Areas",
        data: areas,
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
URL: api/v1/areas/{id}
METHOD: GET
DESC: Get Area By ID 
*/

export const getAreaById = async (req, res) => {
  try {
    const { id } = req.params;
    const area = await Area.getById(id);
    if (area) {
      return res.status(200).json({
        status: "SUCCESS",
        msg: `Details of ${area.area_name}`,
        data: area,
      });
    } else {
      return res.status(404).json({
        status: "NOT FOUND",
        msg: "area not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "SERVER ERROR",
      msg: `${error.message}`,
    });
  }
};
