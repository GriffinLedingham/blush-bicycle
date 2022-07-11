const nodemailer = require("nodemailer");

export function sendEmail(subject: string, body: string) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  var mailOptions = {
    from: process.env.FROM,
    to: process.env.TO,
    subject: subject,
    html: body,
  };

  transporter.sendMail(mailOptions, function (error: Error, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
