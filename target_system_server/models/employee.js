import db from "../db/knex.js";

class Employees {
  static async getAll() {
    try {
      return db("employees").select("*");
    } catch (error) {
      console.error("Error fetching all employees:", error);
      throw error;
    }
  }

  static async getById(id) {
      if (!id) {
          throw new Error("Employee id is required");
      }
      try {
        return db("employees").where({ employee_id: id }).first();
      } catch (error) {
        console.error("Error fetching employee with given id:", error);
        throw error;
      }
  }
}

export default Employees;
