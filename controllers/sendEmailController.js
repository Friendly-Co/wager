var nodemailer = require("nodemailer");

module.exports = {
  create: function(req, res) {
    console.log("emailUsername function from sendEmailController.js");
    console.log(req.body);

    const transporter = nodemailer.createTransport({
      secure: false, //added
      service: "gmail",
      auth: {
        user: "TheJustAFriendlyWagerTeam@gmail.com",
        pass: process.env.PASSWORD
      },
      tls: {
        rejectUnauthorized: false //added
      }
    });

    const mailOptions = {
      from: "TheJustAFriendlyWagerTeam@gmail.com",
      to: req.body.adminEmail || req.body.playerEmail,
      subject: "Your Requested Login Information",
      text: `This is a courtesy email reminder. If you did not request this email, please disregard. Your username is: ${req
        .body.adminName || req.body.playerName}`
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.end();
  }
};
