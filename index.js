const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

const config = require("./config/key");
const { User } = require("./model/users");

mongoose
  .connect(
    // "mongodb+srv://victorChidebelu:fumfum16@first-blog.nktuz.mongodb.net/First-blog?retryWrites=true&w=majority",
    config.mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userData) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(5000);
