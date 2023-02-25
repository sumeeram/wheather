const User = require("../../models/auth/auth");
const crypto = require("crypto");

//when we use asynchronous function we need try catch block
exports.register = async (req, res) => {
  //controller for register
  const { firstName, lastName, contactNo, email, password } = req.body; //destructur e method

  try {
    const user = await User.create({
      firstName,
      lastName,
      contactNo,
      email,
      password,
    });
    sendToken(user, 200, res);
  } catch (error) {
    if (error.code === 11000) {
      const message = "Already have an account using this email ";
      return res.status(400).json({ success: false, error: message });
    }

    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, error: message });
    }
  }
};

exports.login = async (req, res) => {
  //controller for login
  const { email, password } = req.body;

  if (!email || !password) {
    //backend validation
    return res
      .status(400)
      .json({ success: false, error: "Please enter username and password" });
  } //400 Bad Request

  try {
    const user = await User.findOne({ email }).select("+password"); //match two passwords

    if (!user) {
      //true
      return res.status(401).json({
        success: false,
        available: "User does not exists. Please create an account !",
      });
    }

    const isMatch = await user.matchPasswords(password); //matching the passwords from the received from request and from the db

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid Credentials" });
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      // 500 internal server error
      success: false,
      error: error.message,
    });
  }
};

const sendToken = (user, statusCode, res) => {
  //JWT get
  const token = user.getSignedToken();
  const firstName = user.firstName;
  const lastName = user.lastName;
  const contactNo = user.contactNo;
  const email = user.email;
  const id = user._id;
  res.status(200).json({
    success: true,
    token,
    firstName,
    lastName,
    contactNo,
    email,
    id,
  });
};
