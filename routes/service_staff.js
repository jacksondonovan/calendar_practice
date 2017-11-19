const express = require('express')
const router = express.Router()
const linkQuery = require('../db/linkQuery')

//mounted at /service_staff
router.get('/service_provider/:company_name',(req,res)=>{
  linkQuery.getStaffMembers().where('employed_by',req.params.company_name).then((listofStaff)=>{
    linkQuery.getServiceProvider().where('company_name',req.params.company_name).first().then((founduser)=>{
      res.render('service_provider_my_staff',{
        SOdetails:founduser,
        staffList:listofStaff
      })
    })
  })
})

module.exports = router;
