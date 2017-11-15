const express = require('express')
const router = express.Router()
const linkQuery = require('../db/linkQuery')

//mounted at /edit
router.get('/property_owner/:email',(req,res)=>{
  linkQuery.getPropertyOwner().where('email',req.params.email).first().then((edituser)=>{
    res.render('property_owner_edit',{userdetails:edituser})
  })
})

router.get('/property_owner/nevermindedited/:email',(req,res)=>{
  linkQuery.getPropertyOwner().where('email',req.params.email).first().then((backtoprof)=>{
    res.redirect('/profile/property_owner/' + backtoprof.email)
  })
})

router.post('/property_owner/edited/:email',(req,res)=>{
  linkQuery.updatePropertyOwner(req.body).then((data)=>{
    res.redirect('/profile/property_owner/' + req.body.email)
  })
})

router.get('/property_owner/delete/:id',(req,res)=>{
  linkQuery.deletePropertyOwner(req.params.id).then(()=>{
    res.redirect('/')
  })
})

module.exports = router;
