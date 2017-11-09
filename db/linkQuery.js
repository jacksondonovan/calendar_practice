const knex = require('./knex')

function addPropertyOwner(obj){
  return knex('property_users').insert(obj)
}

function getPropertyOwner(email){
  return knex('property_users').select()
}

function addServiceProvider(obj){
  return knex('service_users').insert(obj)
}

function getServiceProvider(){
  return knex('service_users').select()
}

module.exports = {
  addPropertyOwner,
  getPropertyOwner,
  addServiceProvider,
  getServiceProvider
}
