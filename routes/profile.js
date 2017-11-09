const express = require('express')
const router = express.Router()
const linkQuery = require('../db/linkQuery')

//mounted at /profile
router.get('/property_owner/:email',(req,res)=>{
  linkQuery.getPropertyOwner().where('email',req.params.email).first().then((data)=>{
    console.log(data);
    res.render('property_owner_profile',{thedata:data.first_name})
  })
})

// router.post('/',(req,res)=>{
//   linkQuery.getUsers().where('username',req.body.username).first().then((user)=>{
//     console.log(user);
//     if(user){
//       res.redirect('/')
//     } else {
//       linkQuery.addUser(req.body).then((data)=>{
//         res.redirect('/profile/' + req.body.username)
//       })
//     }
//   })
// })

router.get('/:first_name',(req,res)=>{
  linkQuery.getPropertyOwner().where('first_name',req.params.first_name).first().then((data)=>{
    console.log(data);
    res.render('/property_owner_profile',{thisuser:data})
  })
})

module.exports = router;


//this is from yachtowners.
//use this as a template to direct new users to profile or back home.


// router.post('/',(req,res)=>{
//   linkQuery.getUsers().where('username',req.body.username).first().then((user)=>{
//     console.log(user);
//     if(user){
//       res.redirect('/')
//     } else {
//       linkQuery.addUser(req.body).then((data)=>{
//         res.redirect('/profile/' + req.body.username)
//       })
//     }
//   })
// })
//
// router.get('/:username',(req,res)=>{
//   linkQuery.getUsers().where('username',req.params.username).first().then((data)=>{
//     console.log(data);
//     res.render('profile',{thisuser:data})
//   })
// })
