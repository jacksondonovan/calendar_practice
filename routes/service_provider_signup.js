const express = require('express')
const router = express.Router()


//mounted at /serviceprovider
router.get('/',(req,res)=>{
  res.render('service_provider_signup')
})

module.exports = router;
