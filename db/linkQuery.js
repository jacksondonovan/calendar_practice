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

function updateServiceProvider(obj){
  let so = obj
  return knex('service_users').select().where('id',so.id)
  .update({
    'company_name':so.company_name,
    'employee_count':so.employee_count,
    'company_website':so.company_website,
    'address':so.address,
    'email':so.email
  })
}

function deleteServiceProvider(id){
  return knex('service_users').select().where('id',id).del()
}

function addBooking(obj){
  return knex('bookings').insert(obj)
}

function getMyBookings(){
  return knex('bookings').select()
}

function addProperty(obj){
  return knex('property_addresses').insert(obj)
}

function getMyProperties(){
  return knex('property_addresses').select()
}

module.exports = {
  addPropertyOwner,
  getPropertyOwner,
  addServiceProvider,
  getServiceProvider,
  updatePropertyOwner,
  deletePropertyOwner,
  updateServiceProvider,
  deleteServiceProvider,
  addBooking,
  addProperty,
  getMyProperties,
  getMyBookings
}
