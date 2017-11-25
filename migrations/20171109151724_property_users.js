
exports.up = function(knex, Promise) {
  return knex.schema.createTable('property_users',function(table){
    table.increments()
    table.string('company_name').notNullable().unique()
    table.string('profile_picture')
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('phone').notNullable()
    table.string('address').notNullable()
    table.integer('properties_owned').notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable()
    table.string('type').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('property_users')
};
