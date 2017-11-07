const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const app = express()

app.set('view engine','html')

app.use(express.static(path.join(__dirname,'views')))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'app')))

app.get('/',(req,res)=>{
  res.render('index')
})

app.listen(port,(req,res)=>{
  console.log('listening on port' , port);
})

module.exports = app;
