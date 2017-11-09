const express = require('express')
const router = express.Router()
const linkQuery = require('../db/linkQuery')
const bcrypt = require('bcryptjs')
//mounted at /signup

router.post('/property_owner',(req,res)=>{
  linkQuery.getPropertyOwner().where('email',req.body.email).first().then((userfound)=>{
    console.log(userfound);
    if(userfound){
      console.log('you already have an account with us');
      res.redirect('/')
    } else {
      bcrypt.hash(req.body.password,10)
      .then((hash)=>{
        req.body.password = hash
        console.log(hash);
        linkQuery.addPropertyOwner(req.body).then(function(){
          linkQuery.getPropertyOwner().where('email',req.body.email).first().then(function(po){
            res.redirect('/profile/property_owner/' + po.email)
          })
        })
      })
    }
  })
})

router.post('/service_provider',(req,res)=>{
  linkQuery.getServiceProvider().where('email',req.body.email).first().then((founduser)=>{
    console.log(founduser);
    if(founduser){
      console.log('you already have an account with us');
      res.redirect('/')
    } else {
      bcrypt.hash(req.body.password,10)
      .then((hash)=>{
        req.body.password = hash
        console.log(hash);
        linkQuery.addServiceProvider().where('email',req.body.email).first().then(function(sp){
          res.redirect('/profile/service_provider/' + sp.email)
        })
      })
    }
  })
})

module.exports = router;
