const express = require('express');
const nodemailer = require('nodemailer');

nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'jerudmoyer',
    pass: 'Fz09rulz!'
  }
});

// transporter.verify((error, success) => {
//   if(error) {
//     console.log(error);
//   } else {
//     console.log('Server is ready to take our messages');
//   }
// });
