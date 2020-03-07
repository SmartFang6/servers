const express = require('express');
const db = require('./db/connect')
const app = express()
const path = require('path')
const foodRouter = require('./router/foodRouter')
const bodyParser = require('body-parser')
const cors = require('cors')
const fileRouter = require('./router/fileRouter')

app.use('/public',express.static(path.join(__dirname,'/static')))
app.use(bodyParser.urlencoded({ extended: false })) //post请求的body信息体
app.use(bodyParser.json())
app.use('/food',foodRouter)
app.use(cors())
app.use('/file',fileRouter)

app.listen(3000,()=>{
  console.log('start')
})