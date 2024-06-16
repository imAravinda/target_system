import db from "../db/knex.js";

class Target {
  static async getAll() {
    try {
      return db("target").select("*");
    } catch (error) {
      console.error("Error fetching all targets:", error);
      throw error;
    }
  }

  static async getTargetsByStatus(status) {
    try {
      return db("target").select("*").where({ target_state: status });
    } catch (error) {
      console.error("Error fetching all active targets:", error);
      throw error;
    }
  }

  static async getById(id) {
    if (!id) {
      throw new Error("Target ID is required");
    }
    try {
      return db("target").where({ targetId: id }).first();
    } catch (error) {
      console.error(`Error fetching target with ID ${id}:`, error);
      throw error;
    }
  }

  static async create(data) {
    if (!data) {
      throw new Error("Must provide required data");
    }
    if (!["active", "deactive"].includes(data.target_state)) {
      throw new Error("Invalid target_state value");
    }
    try {
      return db("target").insert(data).returning("*");
    } catch (error) {
      console.error(`Error creating target with ID ${id}:`, error);
      throw error;
    }
  }

  static async update(id,data) {
    if (
      data.target_state &&
      !["active", "deactive"].includes(data.target_state)
    ) {
      throw new Error("Invalid target_state value");
    }
    try {
      return db("target").where({ targetId: id }).update(data);
    } catch (error) {
      console.error(`Error updaing target with ID ${id}:`, error);
      throw error;
    }
  }

  static async delete(id) {
    if (!id) {
      throw new Error("Target Id is required");
    }
    try {
      return db("target")
        .where({ targetId: id })
        .update({ target_state: "deactive" })
        .returning("*");
    } catch (error) {
      console.error(`Error deleting target with ID ${id}:`, error);
      throw error;
    }
  }
}

export default Target;
