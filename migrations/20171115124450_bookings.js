
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bookings',function(table){
    table.increments()
    table.boolean('is_available').defaultTo(true)
    table.string('requested_by').references('company_name').inTable('property_users').notNullable()
    table.string('requested_for').references('company_name').inTable('service_users').notNullable()
    table.time('date_submitted')
    table.string('date_needed').notNullable()
    table.string('property_address').references('property_address').inTable('property_addresses').notNullable()
    table.integer('unit_number').references('unit_number').inTable('property_addresses')
    table.boolean('needs_cleaning').notNullable()
    table.boolean('needs_repair').notNullable()
    table.boolean('is_checkedout').defaultTo(false)
    table.string('assigned_to')
    table.string('hour_to_be_completed')
    table.string('hour_completed')
    table.boolean('is_completed').defaultTo(false)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bookings')
};
