
exports.seed = function(knex, Promise) {
  return knex('admin').del()
    .then(() => {
      return knex('admin').insert([
        {user: "vm-admin", password: 'V1dy@mAndiR'}
      ])
    }).then(() => {
        return knex('schedule').del()
    }).then( () => {
        return knex('schedule').insert([
            {started: false, event: "lkg_application"}
        ])
    });
};
