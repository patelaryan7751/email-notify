const express = require("express");
const nodemailer = require("nodemailer");
const emailLPG = express();

emailLPG.listen(3000, () => {
  console.log("Server is Up and Running");
});

emailLPG.get("/", (req, res) => {
  return res.json({ result: "Success" });
});

emailLPG.get("/sendAlertEmail/", (req, res) => {
  console.log(req.query.email);
  const sendEmail = passEm(req.query.email);
  return res.json({ result: "Success Email Sent" });
  // return res.json({ result: req.params.email });
});

emailLPG.get("/sendBookEmail/", (req, res) => {
  console.log(req.query.email);
  const sendEmail = passBookEm(req.query.email);
  return res.json({ result: "Success Booked gas" });
  // return res.json({ result: req.params.email });
});

// var transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "quizzinenewsletter@gmail.com",
//     pass: "quizzinenewsletter12345",
//   },
// });
var transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: "lpgsolution@hotmail.com",
    pass: "@514513512Ar",
  },
});

function passEm(email) {
  var mailOptions = {
    from: "lpgsolution@hotmail.com",
    to: `${email}`,
    subject: "LPG Leakage Detected",
    html: `<h1 style="color:red; font-weight:bold;">ALERT!!!</h1><p>Warning: LPG gas leakage detected in your home . </p>`,
  };

  return passOp(mailOptions);
}

function passBookEm(email) {
  var mailOptions = {
    from: "lpgsolution@hotmail.com",
    to: `${email}`,
    subject: "LPG gas Booked ",
    html: `<h1 style="color:green; font-weight:bold;">Booking Successful :) </h1><p> LPG gas has been booked successfully. </p>`,
  };

  return passOp(mailOptions);
}

function passOp(mailOptions) {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return error;
    } else {
      console.log("Email sent: " + info.response);
      return info.response;
    }
  });
}
