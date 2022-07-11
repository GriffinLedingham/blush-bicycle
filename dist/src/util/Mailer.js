"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
var nodemailer = require("nodemailer");
function sendEmail(subject, body) {
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
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Email sent: " + info.response);
        }
    });
}
exports.sendEmail = sendEmail;
