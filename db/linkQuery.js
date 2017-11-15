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

function updatePropertyOwner(obj){
  let po = obj
  return knex('property_users').select().where('id',po.id)
  .update({
    'first_name':po.first_name,
    'last_name':po.last_name,
    'address':po.address,
    'email':po.email,
    'type':po.type
  })
}

function deletePropertyOwner(id){
  return knex('property_users').select().where('id',id).del()
}

module.exports = {
  addPropertyOwner,
  getPropertyOwner,
  addServiceProvider,
  getServiceProvider,
  updatePropertyOwner,
  deletePropertyOwner
}
