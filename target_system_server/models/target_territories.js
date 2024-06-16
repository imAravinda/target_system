import db from "../db/knex.js";

class TargetTerritory {
  static async create(data) {
    try {
      return await db("target_territory").insert(data);
    } catch (error) {
      console.error("Error creating new record:", error);
      throw error;
    }
  }

  static async getByTargetId(targetId) {
    return await db("target_territory")
      .join(
        "territory",
        "target_territory.tt_territory_id",
        "territory.territoryId"
      )
      .where({ tt_target_id: targetId })
      .select(
        "*"
      );
  }

  static async update(targetId, territoryId, data) {
    return await db("target_territory")
      .where({
        tt_target_id: targetId,
        tt_territory_id: territoryId,
      })
      .update(data);
  }
}

export default TargetTerritory;
