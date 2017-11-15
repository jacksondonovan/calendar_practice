
exports.up = function(knex, Promise) {
  return knex.schema.createTable('property_addresses',function(table){
    table.increments()
    table.string('owned_by').references('company_name').inTable('property_users').notNullable()
    table.string('property_address').notNullable().unique()
    table.integer('unit_number').unique()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('property_addresses')
};
