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
        linkQuery.addServiceProvider(req.body).then(function(){
          linkQuery.getServiceProvider().where('email',req.body.email).first().then(function(sp){
            res.redirect('/profile/service_provider/' + sp.email)
          })
        })
      })
    }
  })
})

router.post('/staff_member',(req,res)=>{
  linkQuery.addStaffMember(req.body).then(function(){
    linkQuery.getServiceProvider().where('company_name',req.body.employed_by).first().then((foundprovider)=>{
      res.redirect('/profile/service_provider/' + foundprovider.email)
    })
  })
})




module.exports = router;
