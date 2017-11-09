const express = require('express')
const router = express.Router()


//mounted at /propertyowner
router.get('/',(req,res)=>{
    res.render('property_owner_signup')
})



//this is from yachtowners.
//use this template to send new users over to the profile route


// router.post('/prof',(req,res)=>{
//   linkQuery.getUsers().where('username',req.body.username).first().then((user)=>{
//     console.log(user);
//     if(!user){
//       res.redirect('/')
//     } else{
//       res.redirect('/profile/' + req.body.username)
//     }
//   })
// })


module.exports = router;
