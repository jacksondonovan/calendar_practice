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
        return Number(brokenUp[2])
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
        let temptemp;
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
      function calendarDates(arrOfNums){
        let classNumbers = []
        for (let i = 0; i < arrOfNums.length; i++) {
          switch (arrOfNums[i]) {
            case 1:
              console.log('booking on the first');
              break;
            case 2:
              console.log('booking on the second');
              break;
            case 3:
              console.log('booking on the third');
              break;
            case 4:
              console.log('booking on the fourth');
              break;
            case 5:
              console.log('booking on the fifth');
              break;
            case 6:
              console.log('booking on the sixth');
              break;
            case 7:
              console.log('booking on the seventh');
              break;
            case 8:
              console.log('booking on the eigthth');
              break;
            case 9:
              console.log('booking on the ninth');
              break;
            case 10:
              console.log('booking on the tenth');
              break;
            case 11:
              console.log('booking on the eleventh');
              break;
            case 12:
              console.log('booking on the twelth');
              break;
            case 13:
              classNumbers.push('thirteen')
              console.log('booking on the 13th');
              break;
            case 14:
              console.log('booking on the 14th');
              break;
            case 15:
              console.log('booking on the 15th');
              break;
            case 16:
              console.log('booking on the 16th');
              break;
            case 17:
              console.log('booking on the 17th');
              break;
            case 18:
              console.log('booking on the 18th');
              break;
            case 19:
              console.log('booking on the 19th');
              break;
            case 20:
              console.log('booking on the 20th');
              break;
            case 21:
              console.log('booking on the 21st');
              break;
            case 22:
              console.log('booking on the 22nd');
              break;
            case 23:
              console.log('booking on the 23rd');
              break;
            case 24:
              console.log('booking on the 24th');
              break;
            case 25:
              console.log('booking on the 25th');
              break;
            case 26:
              console.log('booking on the 26th');
              break;
            case 27:
              console.log('booking on the 27th');
              break;
            case 28:
              classNumbers.push('twenty-eight')
              console.log('booking on the 28th');
              break;
            case 29:
            classNumbers.push('twenty-nine')
              console.log('booking on the 29th');
              break;
            case 30:
              console.log('booking on the 30th');
              break;
            case 31:
              console.log('booking on the 31st');
              break;
            default:

          }
        }
        return classNumbers;
      }
      sortBoth(onlyPendingDates,pendingBookingsList);
      let arrayofclasses = calendarDates(onlyPendingDates)
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
          var justDates = [];
          var justPendings = [];
          for(let i = 0; i < myBookings.length; i++){
            if(!myBookings[i].is_available && !myBookings[i].is_completed){
              justDates.push(upcomingDate(myBookings[i].date_needed));
              justPendings.push(myBookings[i])
            }
          }
          function calendarDates(arrOfNums){
            let classNumbers = []
            for (let i = 0; i < arrOfNums.length; i++) {
              let numbervalue = arrOfNums[i]--;
              switch (numbervalue) {
                case 1:
                  console.log('booking on the first');
                  break;
                case 2:
                  console.log('booking on the second');
                  break;
                case 3:
                  console.log('booking on the third');
                  break;
                case 4:
                  console.log('booking on the fourth');
                  break;
                case 5:
                  console.log('booking on the fifth');
                  break;
                case 6:
                  console.log('booking on the sixth');
                  break;
                case 7:
                  console.log('booking on the seventh');
                  break;
                case 8:
                  console.log('booking on the eigthth');
                  break;
                case 9:
                  console.log('booking on the ninth');
                  break;
                case 10:
                  console.log('booking on the tenth');
                  break;
                case 11:
                  console.log('booking on the eleventh');
                  break;
                case 12:
                  console.log('booking on the twelth');
                  break;
                case 13:
                  classNumbers.push('thirteen')
                  console.log('booking on the 13th');
                  break;
                case 14:
                  console.log('booking on the 14th');
                  break;
                case 15:
                  console.log('booking on the 15th');
                  break;
                case 16:
                  console.log('booking on the 16th');
                  break;
                case 17:
                  console.log('booking on the 17th');
                  break;
                case 18:
                  console.log('booking on the 18th');
                  break;
                case 19:
                  console.log('booking on the 19th');
                  break;
                case 20:
                  console.log('booking on the 20th');
                  break;
                case 21:
                  console.log('booking on the 21st');
                  break;
                case 22:
                  console.log('booking on the 22nd');
                  break;
                case 23:
                  console.log('booking on the 23rd');
                  break;
                case 24:
                  console.log('booking on the 24th');
                  break;
                case 25:
                  console.log('booking on the 25th');
                  break;
                case 26:
                  console.log('booking on the 26th');
                  break;
                case 27:
                  console.log('booking on the 27th');
                  break;
                case 28:
                  classNumbers.push('twenty-eight')
                  console.log('booking on the 28th');
                  break;
                case 29:
                  classNumbers.push('twenty-nine')
                  console.log('booking on the 29th');
                  break;
                case 30:
                  console.log('booking on the 30th');
                  break;
                case 31:
                  console.log('booking on the 31st');
                  break;
                default:

              }
            }
            return classNumbers;
          }
          function anotherBubble(pendingarr,pendingdates){
            for (var i = 0; i < pendingdates.length; i++) {
              pendingdates[i] = ++pendingdates[i]
            }
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
            console.log('is this happening?' , pendingdates);
            return pendingarr;
          }
          anotherBubble(justPendings,justDates)
          let allclassdates = calendarDates(justDates)
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
              thirdNextScheduling:upcomingDate(justPendings[2].date_needed),
              nextPropertyPhoto:justPendings[0].property_photo,
              secondNextPropertyPhoto:justPendings[1].property_photo,
              thirdNextPropertyPhoto:justPendings[2].property_photo
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
