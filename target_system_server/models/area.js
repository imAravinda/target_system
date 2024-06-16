import db from "../db/knex.js";
class Area {
  static async getAll() {
    try {
      return db("area").select("*");
    } catch (error) {
      console.error("Error fetching all areas:", error);
      throw error;
    }
  }

  static async getById(id) {
    if (!id) {
      throw new Error("Area ID is required");
    }
    try {
      return db("area").where({ area_id: id }).first();
    } catch (error) {
      console.error(`Error fetching area with ID ${id}:`, error);
      throw error;
    }
  }
}

export default Area;
