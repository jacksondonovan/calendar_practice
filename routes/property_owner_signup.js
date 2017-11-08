const express = require('express')
const router = express.Router()


//mounted at /propertyowner
router.get('/',(req,res)=>{
    res.render('property_owner_signup')
})

module.exports = router;
