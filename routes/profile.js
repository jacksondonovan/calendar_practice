const express = require('express')
const router = express.Router()
const linkQuery = require('../db/linkQuery')
const bcrypt = require('bcryptjs')
const cookieSession = require('cookie-session')
const key = process.env.COOKIE_KEY || 'asdfasdf'

//mounted at /profile
router.get('/property_owner/:email',(req,res)=>{
  linkQuery.getPropertyOwner().where('email',req.params.email).first().then((data)=>{
    console.log(data);
    res.render('property_owner_profile',{POdetails:data})
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
      res.render('service_provider_profile',{
        SOdetails:data,
        totalBookings:myBookings.length,
        completedBookings:bookingsCompleted,
        displayRevenue:revenue
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
