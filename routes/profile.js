const express = require('express')
const router = express.Router()

//mounted at /profile
router.get('/property_owner',(req,res)=>{
  res.render('property_owner_profile')
})

module.exports = router;
