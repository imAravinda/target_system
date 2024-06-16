import db from "../db/knex.js";

class Designation {
  static async getAll() {
    try {
      return db("designation").select("*");
    } catch (error) {
      console.error("Error fetching all employees:", error);
      throw error;
    }
  }

  static async getById(id) {
    if (!id) {
      throw new Error("Designation ID is required");
    }
    try {
      return db("designation").where({ designation_id: id }).first();
    } catch (error) {
      console.error("Error fetching designation with given id:", error);
      throw error;
    }
  }
}

export default Designation;
