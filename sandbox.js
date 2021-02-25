// just like the file name said
// this used only for testing packages usage
// Doesnt affect application in any possible way
// require('dotenv').config();
// const nodemailer = require('nodemailer');

// // create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.GMAIL,
//         pass: process.env.PASSWORD,
//     }
// });

// // setup email data with unicode symbols
// let mailOptions = {
//     from: process.env.GMAIL, // sender address
//     to: 'rickyafk@gmail.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world ?', // plain text body
//     html: '<b>Hello world ?</b>' // html body
// };

// // send mail with defined transport object
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message %s sent: %s', info.messageId, info.response);
// });
