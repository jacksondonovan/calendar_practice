const express = require('express')
const router = express.Router()
const linkQuery = require('../db/linkQuery')

//mounted at /profile
router.post('/property_owner',(req,res)=>{
  console.log('anything');
  console.log(req.body);
  linkQuery.getPropertyOwner().where('first_name',req.body.first_name).first().then((founduser)=>{
    if(founduser){
      res.redirect('/')
    } else {
      linkQuery.addPropertyOwner(req.body).then((data)=>{
        res.redirect('/profile/' + req.body.first_name)
      })
    }
  })
})

router.get('/:first_name',(req,res)=>{
  linkQuery.getPropertyOwner().where('first_name',req.params.first_name).first().then((data)=>{
    console.log(data);
    res.render('/property_owner_profile',{thisuser:data})
  })
})

module.exports = router;
