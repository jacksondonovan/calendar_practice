const knex = require('./knex')

function addPropertyOwner(obj){
  return knex('property_users').insert(obj)
}

function getPropertyOwner(email){
  return knex('property_users').select()
}

module.exports = {
  addPropertyOwner,
  getPropertyOwner
}
