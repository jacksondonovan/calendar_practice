const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const app = express()

var propertyOwner = require('./routes/property_owner_signup.js')
var serviceProvider = require('./routes/service_provider_signup.js')
var profile = require('./routes/profile.js')

app.set('view engine','hbs')

app.use(express.static(path.join(__dirname,'views')))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'app')))

app.use('/property_owner_signup',propertyOwner)
app.use('/service_provider_signup',serviceProvider)
app.use('/profile',profile)

app.get('/',(req,res)=>{
  res.render('index')
})

app.listen(port,(req,res)=>{
  console.log('listening on port' , port);
})

module.exports = app;
