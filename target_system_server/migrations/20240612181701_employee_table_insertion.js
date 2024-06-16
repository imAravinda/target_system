/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex("employees").insert([
    { employee_name: "Kaveesha Silva", designation_id: 2, e_area_id: 1 },
    { employee_name: "Dasun Perera", designation_id: 4, e_area_id: 3 },
    { employee_name: "Nimantha Shanuka", designation_id: 4, e_area_id: 2 },
    // Add more employees as needed
  ]);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  
}
