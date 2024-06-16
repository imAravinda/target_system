import db from "../db/knex.js";

class Territory {
  static async getAll() {
    try {
      return await db("territory").select("*");
    } catch (error) {
      console.error("Error fetching all territories:", error);
      throw error;
    }
  }

  static async getById(id) {
    if (!id) {
      throw new Error("Territory ID is required");
    }
    try {
      return await db("territory").where({ territoryId: id }).first();
    } catch (error) {
      console.error(`Error fetching territory with ID ${id}:`, error);
      throw error;
    }
  }

  static async getByArea(areaId) {
    if (!areaId) {
      throw new Error("Area ID is required");
    }
    try {
      return await db("territory").where({ t_area_id: areaId });
    } catch (error) {
      console.error(`Error fetching territories for area ID ${areaId}:`, error);
      throw error;
    }
  }
}

export default Territory;
