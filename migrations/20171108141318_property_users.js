
exports.up = function(knex, Promise) {
  return knex.schema.createTable('property_users',function(table){
    table.increments()
    table.string('first_name')
    table.string('last_name')
    table.string('address')
    table.string('email')
    table.string('password')
    table.string('type')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('property_users')
};
