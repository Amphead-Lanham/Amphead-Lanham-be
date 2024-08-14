const { Router } = require('express');
const nodemailer = require('nodemailer');





module.exports = Router()
  .post('/', async(req, res, next) => {
    const name = req.body.name;
    const senderEmail = req.body.senderEmail;
    const message = req.body.message;
    const flag = req.body.flag;
    const receiver = process.env.EMAIL_RECIEVER;
    const userEmail = process.env.EMAIL_USER;
    const password = process.env.EMAIL_USER_PASSWORD;
    const content = `name: ${name} \nemail: ${senderEmail} \nmesssage: ${message} \n${flag}`;
  
    const transporter = nodemailer.createTransport({
      service: 'Yahoo',
      auth: {
        user: userEmail,
        pass: password,
      }
    });
  
    transporter.verify((error, success) => {
      if(error) {
        console.log(error);
      } else {
        console.log('Server is ready to take our messages');
      }
    });

    const mail = {
      subject: name,
      from: userEmail,
      to: receiver,
      text: content
    };

    await transporter.sendMail(mail, (err, data) => {
      if(err) {
        res.json({
          status: 'fail'
        });
      } else {
        res.json({
          status: 'success'
        });
      }
    });
  });
