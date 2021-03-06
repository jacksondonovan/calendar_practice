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
  // linkQuery.getPropertyOwner().where('email',req.params.email).first().then((backtoprof)=>{
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

router.get('/service_provider/:email',(req,res)=>{
  linkQuery.getServiceProvider().where('email',req.params.email).first().then((editservicer)=>{
    res.render('service_provider_edit',{change_servicer:editservicer})
  })
})

router.get('/service_provider/nevermindedited/:email',(req,res)=>{
  linkQuery.getServiceProvider().where('email',req.params.email).first().then((backtoprof)=>{
    res.redirect('/profile/service_provider/' + backtoprof.email)
  })
})

router.post('/service_provider/edited/:email',(req,res)=>{
  linkQuery.updateServiceProvider(req.body).then((data)=>{
    res.redirect('/profile/service_provider/' + req.body.email)
  })
})

router.get('/service_provider/delete/:id',(req,res)=>{
  linkQuery.deleteServiceProvider(req.params.id).then(()=>{
    res.redirect('/')
  })
})

module.exports = router;
