const mongoose = require('mongoose');//链接数据库
mongoose.connect('mongodb://localhost/rs',{ useNewUrlParser: true,useUnifiedTopology: true })
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('db ok')
});