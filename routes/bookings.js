const express = require('express')
const router = express.Router()
const linkQuery = require('../db/linkQuery')

//mounted on /bookings

router.get('/property_owner/:company_name',(req,res)=>{
  linkQuery.getPropertyOwner().where('company_name',req.params.company_name).first().then((founduser)=>{
    linkQuery.getMyBookings().where('requested_by',req.params.company_name).then((bookingList)=>{
      let pendingBookingsList = [];
      let openRequests = []
      for(let i = 0; i < bookingList.length; i++){
        if(!bookingList[i].is_available){
          pendingBookingsList.push(bookingList[i])
        } else {
          openRequests.push(bookingList[i])
        }
      }
      res.render('property_owner_bookings',{
        thisPO:founduser,
        allMyBookings:bookingList,
        myPendingBookings:pendingBookingsList,
        myOpenRequests:openRequests
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

router.get('/service_provider/:company_name',(req,res)=>{
  linkQuery.getServiceProvider().where('company_name',req.params.company_name).first().then((founduser)=>{
    linkQuery.getMyBookings().where('requested_for',req.params.company_name).then((servicebookinglist)=>{
      let pendingBookingsList = [];
      let openRequests = []
      for(let i = 0; i < servicebookinglist.length; i++){
        if(!servicebookinglist[i].is_available){
          pendingBookingsList.push(servicebookinglist[i])
        } else {
          openRequests.push(servicebookinglist[i])
        }
      }
      res.render('service_provider_bookings',{
        thisSO:founduser,
        allMyBookings:servicebookinglist,
        bookingsPending:pendingBookingsList,
        requestsOpen:openRequests
      })
    })
  })
})

router.get('/schedule/:requested_for/:id',(req,res)=>{
  linkQuery.getServiceProvider().where('company_name',req.params.requested_for).first().then((foundservicer)=>{
    linkQuery.getMyBookings().where('id',req.params.id).first().then((foundbooking)=>{
      res.render('schedule_service_staff_booking',{
        currentSO:foundservicer,
        bookingDetails:foundbooking
      })
    })
  })
})

router.post('/staff_scheduling',(req,res)=>{
  linkQuery.getMyBookings().where('id',req.body.id).first().then((foundbooking)=>{
    linkQuery.getServiceProvider().where('company_name',foundbooking.requested_for).first().then((servicer)=>{
      linkQuery.updateBookingAssigning(req.body).then(function(data) {
        res.redirect('/profile/service_provider/' + servicer.email)
      })
    })
  })
})

router.get('/complete/:company_name/:id',(req,res)=>{
  linkQuery.getMyBookings().where('id',req.params.id).first().then((foundbooking)=>{
    linkQuery.getServiceProvider().where('company_name',foundbooking.requested_for).first().then((servicer)=>{
      res.render('service_provider_complete_booking',{
        bookingDetails:foundbooking,
        currentSO:servicer
      })
    })
  })
})


module.exports = router;
