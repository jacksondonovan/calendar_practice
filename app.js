const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const app = express()
const cookieSession = require('cookie-session')
const key = process.env.COOKIE_KEY || 'asdfasdf'

var propertyOwner = require('./routes/property_owner_signup.js')
var serviceProvider = require('./routes/service_provider_signup.js')
var profile = require('./routes/profile.js')
var signUp = require('./routes/signup.js')
var logIn = require('./routes/login.js')
var edit = require('./routes/edit.js')
var bookings = require('./routes/bookings.js')
var myProperties = require('./routes/my_properties.js')
var myStaff = require('./routes/service_staff.js')

app.set('view engine','hbs')

app.use(cookieSession({
  name: 'session',
  keys: [key],
  maxAge: 24 * 60 * 60 * 1000
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname,'views')))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'app')))

app.use('/property_owner_signup',propertyOwner)
app.use('/service_provider_signup',serviceProvider)
app.use('/profile',profile)
app.use('/signup',signUp)
app.use('/login',logIn)
app.use('/edit',edit)
app.use('/bookings',bookings)
app.use('/properties',myProperties)
app.use('/service_staff',myStaff)



app.get('/',(req,res)=>{
  res.render('index')
})

app.listen(port,(req,res)=>{
  console.log('listening on port' , port);
})

module.exports = app;
