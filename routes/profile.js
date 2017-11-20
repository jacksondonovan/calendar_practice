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
      function upcomingDate(dateSTR){
        let arrDate = dateSTR.split('/')
        return arrDate[2]
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

      var justDates = [];
      var justPendings = [];
      for(let i = 0; i < myBookings.length; i++){
        if(!myBookings[i].is_available){
          justDates.push(upcomingDate(myBookings[i].date_needed));
          justPendings.push(myBookings[i])
        }
      }
      console.log(justDates);
      function anotherBubble(pendingarr,pendingdates){
        let temp;
        let newtemp;
        let truth = true;
        while(truth){
          let count = 0;
          for(let i = 0; i < pendingarr.length; i++){
            if(pendingdates[i] > pendingdates[i+1]){
              newtemp = pendingdates[i];
              pendingdates[i] = pendingdates[i+1];
              pendingdates[i+1] = newtemp;
              temp = pendingarr[i];
              pendingarr[i] = pendingarr[i+1];
              pendingarr[i+1] = temp;
              count++
            }
          }
          if(count === 0){
            truth = false;
          }
        }
        return pendingarr;
      }
      anotherBubble(justPendings,justDates)
      console.log(justDates);
      console.log(justPendings);
      let bookingsCompleted = 0;
      let pendingBookingDates = []
      // for(let i = 0; i < myBookings.length; i++){
      //   if(!myBookings[i].is_available){
      //     allPendingBookings.push(myBookings[i])
      //   }
      // }
      // console.log(allPendingBookings);
      // let orderBookings = []
      // let currentLow = 32
      // for(let i = 0; i < allPendingBookings.length; i++){
      //   if(upcomingDate(allPendingBookings[i].date_needed) < currentLow){
      //     currentLow = upcomingDate(allPendingBookings[i].date_needed);
      //     orderBookings.unshift(allPendingBookings[i]);
      //   }
      // }
      // console.log(orderBookings);

      for(let i = 0; i < myBookings.length; i++){
        if(myBookings[i].is_completed){
          bookingsCompleted++
        }
        if(!myBookings[i].is_available){
          pendingBookingDates.push(upcomingDate(myBookings[i].date_needed))
        }
      }
      let revenue = bookingsCompleted * 19.99

      // bubble(pendingBookingDates)

      res.render('service_provider_profile',{
        SOdetails:data,
        totalBookings:pendingBookingDates.length,
        completedBookings:bookingsCompleted,
        displayRevenue:revenue,
        nextScheduling:upcomingDate(justPendings[0].date_needed),
        nextStaff:justPendings[0].assigned_to,
        nextAddress:justPendings[0].property_address,
        nextUnit:justPendings[0].unit_number,
        nextNeedsCleaning:justPendings[0].needs_cleaning,
        nextNeedsRepair:justPendings[0].needs_repair,
        nextCheckoutConfirm:justPendings[0].is_checkedout,
        secondNextScheduling:upcomingDate(justPendings[1].date_needed),
        secondnextStaff:justPendings[1].assigned_to,
        secondnextAddress:justPendings[1].property_address,
        secondnextUnit:justPendings[1].unit_number,
        secondnextNeedsRepair:justPendings[1].needs_repair,
        secondnextNeedsCleaning:justPendings[1].needs_cleaning,
        secondnextCheckoutConfirm:justPendings[1].is_checkedout,
        thirdNextScheduling:upcomingDate(justPendings[2].date_needed),
        thirdnextStaff:justPendings[2].assigned_to,
        thirdnextAddress:justPendings[2].property_address,
        thirdnextUnit:justPendings[2].unit_number,
        thirdnextNeedsCleaning:justPendings[2].needs_cleaning,
        thirdnextNeedsRepair:justPendings[2].needs_repair,
        thirdnextCheckoutConfirm:justPendings[2].is_checkedout
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
