
exports.up = function(knex, Promise) {
  return knex.schema.createTable('service_users',function(table){
    table.increments()
    table.string('company_name').notNullable().unique()
    table.integer('employee_count').notNullable()
    table.string('company_website').notNullable()
    table.string('phone').notNullable()
    table.string('address').notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('service_users')
};
