const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const linkQuery = require('../db/linkQuery')
const cookieSession = require('cookie-session')
const key = process.env.COOKIE_KEY || 'asdfasdf'

//mounted at localhost:3000/login
router.post('/property_owner',(req,res)=>{
  linkQuery.getPropertyOwner().where('email',req.body.email).first().then((user)=>{
    if(user){
      console.log(user);
      bcrypt.compare(
        req.body.password, user.password
      ).then(function(data){
        if(data){
          req.session.id = user.id
          res.redirect('/profile/property_owner/' + user.email)
        } else{
          res.redirect('/')
        }
      })
    } else {
      res.redirect('/')
    }
  })
})

router.post('/service_provider',(req,res)=>{
  linkQuery.getServiceProvider().where('email',req.body.email).first().then((spuser)=>{
    if(spuser){
      console.log(spuser);
      bcrypt.compare(
        req.body.password, spuser.password
      ).then(function(bool){
        if(bool){
          req.session.id = spuser.id
          res.redirect('/profile/service_provider/' + spuser.email)
        } else {
          res.redirect('/')
        }
      })
    } else {
      res.redirect('/')
    }
  })
})

module.exports = router;
