/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex("designation").insert([
    { designation_name: "Manager" },
    { designation_name: "Area Manager" },
    { designation_name: "Territory Manager" },
    { designation_name: "Sales Rep" },
  ]);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  
}
