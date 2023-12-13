import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("todos", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("title", 255).notNullable();
    table.boolean("checked").defaultTo(true);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("todos");
}
