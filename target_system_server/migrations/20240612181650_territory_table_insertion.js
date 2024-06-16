/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex("territory").insert([
    { territory_name: "Panadura", t_area_id: 1 },
    { territory_name: "Hirana", t_area_id: 1 },
    { territory_name: "Rawathawaththa", t_area_id: 2 },
    { territory_name: "Agulana", t_area_id: 2 },
    { territory_name: "Walana", t_area_id: 1 },
    { territory_name: "Pokunuwita", t_area_id: 3 },
    { territory_name: "Moragahahena", t_area_id: 3 },
    { territory_name: "kandana", t_area_id: 3 },
    // Add more territories as needed
  ]);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  
}
