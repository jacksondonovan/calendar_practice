const express = require('express')
const router = express.Router()
const linkQuery = require('../db/linkQuery')
const bcrypt = require('bcryptjs')
const cookieSession = require('cookie-session')
const key = process.env.COOKIE_KEY || 'asdfasdf'

//mounted at /profile
router.get('/property_owner/:email',(req,res)=>{
  linkQuery.getPropertyOwner().where('email',req.params.email).first().then((data)=>{
    linkQuery.getMyBookings().where('requested_by',data.company_name).then((myBookings)=>{
      let bookingsCompleted = 0;
      let pendingBookings = 0;
      for(let i = 0; i < myBookings.length; i++){
        if(myBookings[i].is_completed){
          bookingsCompleted++;
        }
        if(!myBookings[i].is_available){
          pendingBookings++;
        }
      }
      res.render('property_owner_profile',{
        POdetails:data,
        completedBookings:bookingsCompleted,
        bookingsPending:pendingBookings
      })
    })
  })
})

router.post('/property_owner/:email',(req,res)=>{
  linkQuery.getPropertyOwner().where('email',req.body.email).first().then((user)=>{
    if(user){
      bcrypt.compare(
        req.body.password, user.password
      ).then((data)=>{
        if(data){
          req.session.id = user.id
          res.redirect('/profile/property_owner/' + user.email)
        } else {
          res.redirect('/')
        }
      })
    }
  })
})

router.get('/service_provider/:email',(req,res)=>{
  linkQuery.getServiceProvider().where('email',req.params.email).first().then((data)=>{
    linkQuery.getMyBookings().where('requested_for',data.company_name).then((myBookings)=>{
      let bookingsCompleted = 0;
      for(let i = 0; i < myBookings.length; i++){
        if(myBookings[i].is_completed){
          bookingsCompleted++
        }
      }
      let revenue = bookingsCompleted * 19.99
      let mostUpcoming;

      var upcomingDate = function(dateSTR){
        let arrDate = dateSTR.split('/')
        return arrDate[2]
      }

      let allDays = []
      for(let i = 0; i < myBookings.length; i++){
        allDays.push(upcomingDate(myBookings[i].date_needed))
      }
      var bubble = function(arr){
        let temp
        let truth = true;
        while(truth){
          let counter = 0;
          for(let i = 0; i < arr.length; i++){
            if(arr[i+1] < arr[i]){
              temp = arr[i];
              arr[i] = arr[i+1];
              arr[i+1] = temp;
              counter++;
            }
          }
          if(counter === 0){
            truth = false;
          }
        }
        return arr;
      }
      bubble(allDays)

      res.render('service_provider_profile',{
        SOdetails:data,
        totalBookings:myBookings.length,
        completedBookings:bookingsCompleted,
        displayRevenue:revenue,
        nextBooking:allDays[0],
        secondNextBooking:allDays[1],
        thirdNextBooking:allDays[2]
      })
    })
  })
})



// router.get('/:first_name',(req,res)=>{
//   linkQuery.getPropertyOwner().where('first_name',req.params.first_name).first().then((data)=>{
//     console.log(data);
//     res.render('/property_owner_profile',{thisuser:data})
//   })
// })

module.exports = router;
