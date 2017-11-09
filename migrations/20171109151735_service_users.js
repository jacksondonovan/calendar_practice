
exports.up = function(knex, Promise) {
  return knex.schema.createTable('service_users',function(table){
    table.increments()
    table.string('company_name')
    table.integer('employee_count')
    table.string('company_website')
    table.string('address')
    table.string('email')
    table.string('password')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('service_users')
};
