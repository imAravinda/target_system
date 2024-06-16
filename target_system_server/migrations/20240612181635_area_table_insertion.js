/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex("area").insert([
    { area_name: "Kalutara" },
    { area_name: "Moratuwa" },
    { area_name: "Horana" },
  ]);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  
}
