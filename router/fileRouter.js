const express = require('express')
const router = express.Router()
var multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //指定文件路径
    cb(null, './static/img')
  },
  filename: function (req, file, cb) {
    //指定文件名
    let ty = file.originalname.split('.');
    let types = ty[ty.length - 1]
    let name =(new Date()).getTime()+parseInt(Math.random() *1000)
    // cb(null, file.originalname)
    cb(null, name+'.'+types)
  }
})
var upload = multer({
  storage: storage
})
//上传图片必须用post方法
router.post('/upload', upload.single('logo'), (req, res) => { //single的内容为表单file里面的name值
  // res.send('ok')
  console.log(req.file)
  let {size,mimetype,path,filename} = req.file
  let types = ['jpg','jpeg','png','gif']
  let temType = mimetype.split("/")[1]
  if(size>500000){ //图片大小小于500kb
    return res.send({err:-1,msg:"尺寸过大"})
  }else if(types.indexOf(temType) == -1){  //规定图片的格式
    return res.send({err:-2,msg:"图片格式不符合"})
  }else{
    let url = `/public/img/${filename}`
    res.send({err:0,msg:"file ok",img:url})  //返回图片上传后的服务器地址
  }
  
})
module.exports = router