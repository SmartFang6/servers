const express = require('express')
const router = express.Router()
const foodModel = require('../db/model/foodModel')

/**
 * @api {post} /food/add 添加菜品
 * @apiName addfood
 * @apiGroup Food
 * @apiParam {String} name 菜品名称
 * @apiParam {String} Price 价格
 * @apiParam {String} desc 菜品描述
 * @apiParam {String} typename 类别名称
 * @apiParam {Number} typeid 类别id
 * @apiParam {String} img 图片
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/add',(req,res)=>{
//  let data = {//先使用虚假数据，模拟下
//   name:'青瓜土豆丝',
//   price:'28',
//   desc:'清凉解暑',
//   typename: '小炒',
//   typeid: 1,
//   img:'/public/img/dna1.jpg'   //给服务器穿图片的时候路径不要写全，只写后面的相对路径，前面的前端进行拼接，因为端口号不一定一样
//  }
  let {name,price,desc,typename,typeid,img} = req.body
  //判断参数是否拿到
 foodModel.insertMany({name,price,desc,typename,typeid,img}) //添加数据
 .then((data)=>{
  res.send({err:0,msg:'添加成功'})
 })
 .catch((err)=>{
  // console.log(err)
   res.send({err:-1,msg:'添加失败'})
 })
//  res.send(data)
})
/**
 * @api {post} /food/getInfoType 分类查询
 * @apiName getInfoType
 * @apiGroup Food
 * @apiParam {Number} typeid 类别id
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/getInfoType',(req,res)=>{
let {typeid} = req.body;
foodModel.find({typeid})
.then((data)=>{
  res.send({err:0,msg:'查询成功',list:data})
 })
 .catch((err)=>{
  // console.log(err)
   res.send({err:-1,msg:'查询失败'})
 })
})
/**
 * @api {post} /food/getInfoByKw 关键字查询
 * @apiName getInfoByKw
 * @apiGroup Food
 * @apiParam {String} kw 关键字
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/getInfoByKw',(req,res)=>{
let {kw} = req.body
let reg = new RegExp(kw)  //创建一个正则表达式，匹配关键字kw
//foodModel.find({name:{$regex:reg}}) //在mongodb中使用正则匹配找到关键字，这个是使用$regex在name中查找reg变量里面的值
foodModel.find({$or:[{name:{$regex:reg}},{desc:{$regex:reg}}]}) //匹配name和desc任何一个符合条件的，$or多个条件只要有一个满足就可以
.then((data)=>{
  res.send({err:0,msg:'查询成功',list:data})
 })
 .catch(()=>{
   res.send({err:-1,msg:'查询失败'})
 })
})
/**
 * @api {post} /food/del 删除菜品
 * @apiName del
 * @apiGroup Food
 * @apiParam {String} id1 id值1
 * @apiParam {String} id2 id值2
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/del',(req,res)=>{
 let {id1,id2} = req.body;
//  console.log(id1,id2)
 foodModel.deleteMany({_id:[id1,id2]})  //删除多个用deleteMany，删除单个用deleteOne
 .then(()=>{
   res.send({err:0,msg:"删除成功！"})
 })
 .catch(()=>{
   res.send({err:-1,msg:'删除失败'})
 })
})
/**
 * @api {post} /food/updata 修改数据
 * @apiName updata
 * @apiGroup Food
 * @apiParam {String} name 菜品名称
 * @apiParam {String} Price 价格
 * @apiParam {String} desc 菜品描述
 * @apiParam {String} typename 类别名称
 * @apiParam {Number} typeid 类别id
 * @apiParam {String} img 图片
 * @apiParam {String} _id _id
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/updata',(req,res)=>{
  let {_id,name,price,desc,typename,typeid,img} = req.body
  foodModel.updateMany({_id},{name,price,desc,typename,typeid,img})
  .then(()=>{
    res.send({err:0,msg:"修改成功"})
  })
  .catch(()=>{
    res.send({err:-1,msg:'修改失败'})
  })
})
/**
 * @api {post} /food/getInfoByPage 查询分页
 * @apiName getInfoByPage
 * @apiGroup Food
 * @apiParam {String} page 哪一页
 * @apiParam {String} pageSize 每页数据条数,如果一共十条数据，每页3个，可以分为4页
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/getInfoByPage',(req,res)=>{
let {page = 1,pageSize = 2} = req.body
foodModel.find().limit(Number(pageSize)).skip(Number(page-1)*pageSize)
.then((data)=>{
  res.send({err:0,msg:"查询成功",list:data})
})
.catch(()=>{
  res.send({err:-1,msg:'查询失败'})
})
})
module.exports = router