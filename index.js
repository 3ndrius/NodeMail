const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "public")));

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

// routes
app.get("/", (req, res) => {
  res.json({ message: "Succes from server" });
});

app.post("/send", (req, res, next) => {
  const { name, email, date, message } = req.body;
  let mail = {
    from: name,
    to: process.env.MAIN_MAIL,
    subject: email,
    text: message + date,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "Failed to send mail" + err.message,
        onError: true
      });
    } else {
      res.json({
        status: "You just successfull send a message",
        onError: false
      });
    }
  });
});



let port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listening on port ${port}`));
