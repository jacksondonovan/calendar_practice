
exports.up = function(knex, Promise) {
  return knex.schema.createTable('service_staff',function(table){
    table.increments()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('phone').notNullable()
    table.string('employed_by').references('company_name').inTable('service_users').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('service_staff')
};
