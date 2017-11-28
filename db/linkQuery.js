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
    'profile_picture':po.profile_picture,
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
    'profile_picture':so.profile_picture,
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

function addStaffMember(obj){
  return knex('service_staff').insert(obj)
}

function getStaffMembers(){
  return knex('service_staff').select()
}

function updateBookingAssigning(obj){
  return knex('bookings').select().where('id',obj.id)
  .update({
    'is_available':obj.is_available,
    'assigned_to':obj.assigned_to,
    'hour_to_be_completed':obj.hour_to_be_completed
  })
}

function completeBooking(obj){
  return knex('bookings').select().where('id',obj.id)
  .update({
    'has_been_cleaned':obj.has_been_cleaned,
    'has_been_repaired':obj.has_been_repaired,
    'has_been_checkedout':obj.has_been_checkedout
  })
}

function bookingCompleted(obj){
  return knex('bookings').select().where('id',obj.id)
  .update({
    'is_completed':true
  })
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
  getMyBookings,
  getStaffMembers,
  addStaffMember,
  updateBookingAssigning,
  completeBooking,
  bookingCompleted
}
