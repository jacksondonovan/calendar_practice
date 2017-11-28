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
      function dateUpcoming(dateSTR){
        let brokenUp = dateSTR.split('/')
        return brokenUp[2]
      }
      let onlyPendingDates = [];
      let pendingBookingsList = [];
      let bookingsCompletedList = []
      for(let i = 0; i < myBookings.length; i++){
        if(!myBookings[i].is_available && !myBookings[i].is_completed){
          onlyPendingDates.push(dateUpcoming(myBookings[i].date_needed))
          pendingBookingsList.push(myBookings[i])
        }
        if(!myBookings[i].is_available && myBookings[i].is_completed){
          bookingsCompletedList.push(myBookings[i])
        }
      }

      function sortBoth(arrOfDates,arrOfBookings){
        let temp;
        let anotherTemp;
        let truth = true;
        while(truth){
          let counter = 0;
          for(let i = 0; i < arrOfDates.length; i++){
            if(arrOfDates[i] > arrOfDates[i+1]){
              temp = arrOfDates[i];
              arrOfDates[i] = arrOfDates[i+1];
              arrOfDates[i+1] = temp;
              temptemp = arrOfBookings[i];
              arrOfBookings[i] = arrOfBookings[i+1];
              arrOfBookings[i+1] = temptemp;
              counter++;
            }
          }
          if(counter === 0){
            truth = false;
          }
        }
        return arrOfBookings;
      }
      sortBoth(onlyPendingDates,pendingBookingsList);
      console.log(pendingBookingsList[0].date_needed);
      console.log(pendingBookingsList[1].date_needed);
      console.log(pendingBookingsList[2].date_needed);

      if(pendingBookingsList[0] && !pendingBookingsList[1]){
        res.render('property_owner_profile',{
          POdetails:data,
          completedBookings:bookingsCompletedList.length,
          bookingsPending:pendingBookingsList.length,
          veryNextPending:pendingBookingsList[0],
          veryNextScheduling:dateUpcoming(pendingBookingsList[0].date_needed)
        })
      }
      if(pendingBookingsList[0] && pendingBookingsList[1] && !pendingBookingsList[2]){
        res.render('property_owner_profile',{
          POdetails:data,
          completedBookings:bookingsCompletedList.length,
          bookingsPending:pendingBookingsList.length,
          veryNextPending:pendingBookingsList[0],
          veryNextScheduling:dateUpcoming(pendingBookingsList[0].date_needed),
          secondVeryNextPending:pendingBookingsList[1],
          secondVeryNextScheduling:dateUpcoming(pendingBookingsList[1].date_needed)
        })
      }
      if(pendingBookingsList[0] && pendingBookingsList[1] && pendingBookingsList[2]){
        linkQuery.getMyBookings().where('assigned_to',pendingBookingsList[0].assigned_to).first().then((foundbook)=>{
          linkQuery.getStaffMembers().where('first_name',foundbook.assigned_to).first().then((foundstaff)=>{
            res.render('property_owner_profile',{
              POdetails:data,
              completedBookings:bookingsCompletedList.length,
              bookingsPending:pendingBookingsList.length,
              veryNextPending:pendingBookingsList[0],
              veryNextScheduling:dateUpcoming(pendingBookingsList[0].date_needed),
              secondVeryNextPending:pendingBookingsList[1],
              secondVeryNextScheduling:dateUpcoming(pendingBookingsList[1].date_needed),
              thirdVeryNextPending:pendingBookingsList[2],
              thirdVeryNextScheduling:dateUpcoming(pendingBookingsList[2].date_needed),
              firstPicture:foundstaff.photo
            })
          })
        })
      }
      if(!pendingBookingsList[0]){
        res.render('property_owner_profile',{
          POdetails:data,
          completedBookings:bookingsCompletedList.length,
          bookingsPending:pendingBookingsList.length
        })
      }
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
  console.log(req.params , 'here are the params');
    linkQuery.getServiceProvider().where('email',req.params.email).first().then((data)=>{
      if(data){
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
            if(!myBookings[i].is_available && !myBookings[i].is_completed){
              justDates.push(upcomingDate(myBookings[i].date_needed));
              justPendings.push(myBookings[i])
            }
          }
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
          let bookingsCompleted = 0;
          let pendingBookingDates = []
          for(let i = 0; i < myBookings.length; i++){
            if(myBookings[i].is_completed){
              bookingsCompleted++
            }
            if(!myBookings[i].is_available && !myBookings[i].is_completed){
              pendingBookingDates.push(upcomingDate(myBookings[i].date_needed))
            }
          }
          let revenue = bookingsCompleted * 19.99
          if(justPendings[0] && !justPendings[1]){
            res.render('service_provider_profile',{
              SOdetails:data,
              totalBookings:pendingBookingDates.length,
              completedBookings:bookingsCompleted,
              displayRevenue:revenue,
              nextPending:justPendings[0],
              nextScheduling:upcomingDate(justPendings[0].date_needed)
            })
          }
          if(justPendings[0] && justPendings[1] && !justPendings[2]){
            res.render('service_provider_profile',{
              SOdetails:data,
              totalBookings:pendingBookingDates.length,
              completedBookings:bookingsCompleted,
              displayRevenue:revenue,
              nextScheduling:upcomingDate(justPendings[0].date_needed),
              nextPending:justPendings[0],
              secondnextPending:justPendings[1],
              secondNextScheduling:upcomingDate(justPendings[1].date_needed)
            })
          }
          if(justPendings[0] && justPendings[1] && justPendings[2]){
            res.render('service_provider_profile',{
              SOdetails:data,
              totalBookings:pendingBookingDates.length,
              completedBookings:bookingsCompleted,
              displayRevenue:revenue,
              nextPending:justPendings[0],
              nextScheduling:upcomingDate(justPendings[0].date_needed),
              secondnextPending:justPendings[1],
              secondNextScheduling:upcomingDate(justPendings[1].date_needed),
              thirdnextPending:justPendings[2],
              thirdNextScheduling:upcomingDate(justPendings[2].date_needed)
            })
          }
          if(!justPendings[0]){
            res.render('service_provider_profile',{
              SOdetails:data,
              totalBookings:pendingBookingDates.length,
              completedBookings:bookingsCompleted,
              displayRevenue:revenue
            })
          }
        })
      }
    })
})

router.post('/complete/service',(req,res)=>{
  linkQuery.getMyBookings().where('id',req.body.id).first().then((complete_booking)=>{
    linkQuery.getServiceProvider().where('company_name',complete_booking.requested_for).first().then((servicer)=>{
      linkQuery.completeBooking(req.body).then(function(data){
        linkQuery.getMyBookings().where('id',req.body.id).first().then((same_booking)=>{
          if(!same_booking.needs_repair){
            if(same_booking.has_been_cleaned && same_booking.has_been_checkedout){
              linkQuery.bookingCompleted(req.body).then(function(datadata){
                console.log('completed no repair needed');
                res.redirect('/profile/service_provider/' + servicer.email)
              })
            }
          }
          if(same_booking.needs_repair){
            if(same_booking.has_been_cleaned && same_booking.has_been_repaired && same_booking.has_been_checkedout){
              linkQuery.bookingCompleted(req.body).then(function(datadata){
                console.log('completed repair needed');
                res.redirect('/profile/service_provider/' + servicer.email)
              })
            }
          }
        })
      })
    })
  })
})


module.exports = router;
