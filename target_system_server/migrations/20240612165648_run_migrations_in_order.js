/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  // Create designation table if it does not exist
  await knex.schema.createTableIfNotExists("designation", function (table) {
    table.increments("designation_id").primary();
    table.string("designation_name").notNullable();
  });

  // Create area table if it does not exist
  await knex.schema.createTableIfNotExists("area", function (table) {
    table.increments("area_id").primary();
    table.string("area_name").notNullable();
  });

  // Create territory table if it does not exist
  await knex.schema.createTableIfNotExists("territory", function (table) {
    table.increments("territoryId").primary();
    table.string("territory_name").notNullable();
    table.integer("t_area_id").unsigned().notNullable();

    // Add foreign key constraint to area table
    table
      .foreign("t_area_id")
      .references("area_id")
      .inTable("area")
      .onDelete("CASCADE");

    table.timestamps(true, true);
  });

  // Create employees table if it does not exist
  await knex.schema.createTableIfNotExists("employees", function (table) {
    table.increments("employee_id").primary();
    table.string("employee_name").notNullable();
    table.integer("designation_id").unsigned().notNullable();
    table.integer("e_area_id").unsigned().notNullable();

    // Add foreign key constraint to designation table
    table
      .foreign("designation_id")
      .references("designation_id")
      .inTable("designation")
      .onDelete("CASCADE");

    // Add foreign key constraint to area table
    table
      .foreign("e_area_id")
      .references("area_id")
      .inTable("area")
      .onDelete("CASCADE");

    table.timestamps(true, true);
  });

  // Create target table if it does not exist
  await knex.schema.createTableIfNotExists("target", function (table) {
    table.increments("targetId").primary();
    table.integer("t_emp_id").unsigned().notNullable();
    table.enu("target_state", ["active", "deactive"]).notNullable();
    table.integer("t_designation_id").unsigned().notNullable();
    table.integer("tr_area_id").unsigned().notNullable();

    table
      .foreign("t_emp_id")
      .references("employee_id")
      .inTable("employees")
      .onDelete("CASCADE");

    table
      .foreign("t_designation_id")
      .references("designation_id")
      .inTable("designation")
      .onDelete("CASCADE");

    // Add foreign key constraint to area table
    table
      .foreign("tr_area_id")
      .references("area_id")
      .inTable("area")
      .onDelete("CASCADE");

    table.timestamps(true, true);
  });

  await knex.schema.createTableIfNotExists(
    "target_territory",
    function (table) {
      table.integer("tt_target_id").unsigned().notNullable();
      table.integer("tt_territory_id").unsigned().notNullable();
      table.integer("target_value").notNullable();
      table.string("target_type").notNullable();
      table.string("dynamic_value").notNullable();

      // Foreign key references
      table
        .foreign("tt_target_id")
        .references("targetId")
        .inTable("target")
        .onDelete("CASCADE");
      table
        .foreign("tt_territory_id")
        .references("territoryId")
        .inTable("territory")
        .onDelete("CASCADE");

      // Composite primary key to prevent duplicate entries
      table.primary(["tt_target_id", "tt_territory_id"]);
    }
  );

  
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  // Drop employees table first to avoid foreign key constraint issues
  await knex.schema.dropTableIfExists("employees");

  // Drop designation table
  await knex.schema.dropTableIfExists("designation");

  // Drop area table
  await knex.schema.dropTableIfExists("area");

  // Drop territory table
  await knex.schema.dropTableIfExists("territory");

  // Drop target table
  await knex.schema.dropTableIfExists("target");
}
