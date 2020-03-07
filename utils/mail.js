"use strict";
const nodemailer = require("nodemailer");
//1.创建发送邮件的对象
let transporter = nodemailer.createTransport({
  host: "smtp.qq.com", //发送方的邮箱  通过lib/well-know/serive.json
  port: 465, //端口号
  secure: true, // true for 465, false for other ports
  auth: {
    user: '1270358909@qq.com', // generated ethereal user  发送方的邮箱地址
    pass: 'xahgxqfychmdidge' // generated ethereal password  
  }
});
//2.邮件信息，并发送 sendMail()发送
function send(mail, code) {
  // send mail with defined transport object
  let mailobj = {
    from: '"Fred Foo 👻" <1270358909@qq.com>', // sender address
    to: mail, // list of receivers
    subject: "Hello ✔ 您的验证码", // Subject line
    text: `您的验证码是：${code},有效期五分钟`, // plain text body
    html: `您的验证码是：${code},有效期五分钟` // html body
  }
  // return Promise((resolve,reject)=>{
  //   transporter.sendMail(mailobj, (err, data) => {
  //     console.log(mailobj)
  //     if(!err){
  //       resolve()
  //     }else{
  //       reject()
  //     }
  //   });
  // })
  transporter.sendMail(mailobj,(err,data)=>{
    // console.log(err)
    // console.log(data)
  });
  
}
module.exports = {send}