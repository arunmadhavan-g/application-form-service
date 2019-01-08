
exports.up = knex => {
  return knex.schema
              .createTable('application', table => {
                  table.increments('id').primary();
                  table.string('name');
              });
};

exports.down = knex => {
  return knex.schema
              .dropTableIfExists('application');
};
