
exports.up = function(knex, Promise) {
  return knex.schema
      .createTable("application_forms", table => {
         table.increments("id").primary();
         table.string("name");
          table.string("gender");
          table.date("date_of_birth");
          table.string("nationality");
          table.dateTime("created");
          table.dateTime("updated");
          table.integer('father_id')
              .unsigned()
              .references("id")
              .inTable("parents")
              .onDelete("CASCADE");
          table.integer('mother_id')
              .unsigned()
              .references("id")
              .inTable("parents")
              .onDelete("CASCADE");
      }).createTable("parents", table => {
         table.increments("id").primary();
         table.string("name");
         table.string("occupation");
         table.boolean("is_alumni");
         table.float("annual_income");
      });
};

exports.down = function(knex, Promise) {
  return knex.schema
      .dropTableIfExists("application_forms")
      .dropTableIfExists("parents");
};
