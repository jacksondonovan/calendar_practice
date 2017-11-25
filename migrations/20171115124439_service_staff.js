
exports.up = function(knex, Promise) {
  return knex.schema.createTable('service_staff',function(table){
    table.increments()
    table.string('first_name').notNullable().unique()
    table.string('last_name').notNullable()
    table.string('phone').notNullable()
    table.string('photo').notNullable().unique()
    table.string('employed_by').references('company_name').inTable('service_users').notNullable()
    table.integer('account_number').notNullable()
    table.integer('total_earnings').defaultTo(0)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('service_staff')
};
