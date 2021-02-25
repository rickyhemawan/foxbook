const nodemailer = require('nodemailer')

function sendMail({to, subject, text }) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'foxbook.dont.reply@gmail.com',
        pass: 'foxbook123',
    }
  });
  
  // setup email data with unicode symbols
  let mailOptions = {
    from: 'foxbook.dont.reply@gmail.com', // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
  };
  
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
}

module.exports = { sendMail }