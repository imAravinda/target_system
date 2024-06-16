import Territory from "../models/territory.js";

/* 
URL: api/v1/territories
METHOD: GET
DESC: Get All Territories
*/

export const getTerritories = async (req, res) => {
  try {
    const territories = await Territory.getAll();
    if (territories) {
      return res.status(200).json({
        status: "SUCCESS",
        msg: "Details Of Territories",
        data: territories,
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
URL: api/v1/territory/{id}
METHOD: GET
DESC: Get Territory By ID 
*/

export const getTerritoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const territory = await Territory.getById(id);
    if (territory) {
      return res.status(200).json({
        status: "SUCCESS",
        msg: `Details of ${territory.territory_name}`,
        data: territory,
      });
    } else {
      return res.status(404).json({
        status: "NOT FOUND",
        msg: "territory not found",
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
URL: api/v1/territory/area/{id}
METHOD: GET
DESC: Get Territories By area
*/
export const getTerritoriesByArea = async (req, res) => {
    try {
        const { id } = req.params;
        const territories = await Territory.getByArea(id);
        if (territories) {
            return res.status(200).json({
              status: "SUCCESS",
              msg: `Details of Territories`,
              data: territories,
            });
        }
        else {
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
}
