const express = require('express')
const router = express.Router()
const linkQuery = require('../db/linkQuery')

//mounted on /bookings

router.get('/property_owner/:company_name',(req,res)=>{
  linkQuery.getPropertyOwner().where('company_name',req.params.company_name).first().then((founduser)=>{
    linkQuery.getMyBookings().where('requested_by',req.params.company_name).then((bookingList)=>{
      res.render('property_owner_bookings',{
        thisPO:founduser,
        allMyBookings:bookingList
      })
    })
  })
})

router.post('/create/property_owner/:email',(req,res)=>{
  linkQuery.addBooking(req.body).then(()=>{
    linkQuery.getPropertyOwner().where('email',req.params.email).first().then((userfound)=>{
      res.redirect('/bookings/property_owner/' + userfound.email)
    })
  })
})

module.exports = router;
