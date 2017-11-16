const express = require('express')
const router = express.Router()
const linkQuery = require('../db/linkQuery')

//mounted at /properties
router.get('/property_owner/:company_name',(req,res)=>{
  linkQuery.getPropertyOwner().where('company_name',req.params.company_name).first().then((userfound)=>{
    linkQuery.getMyProperties().where('owned_by',req.params.company_name).then((myList)=>{
      res.render('property_owner_properties',{
        userdetails:userfound,
        allMyProperties:myList
      })
    })
  })
})


router.post('/addition/:company_name',(req,res)=>{
  linkQuery.addProperty(req.body).then(()=>{
    res.redirect('/properties/property_owner/' + req.body.company_name)
  })
})

module.exports = router;
