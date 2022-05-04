const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

//middleware
const fetchuser = require("../middleware/fetchuser");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'YusufIsGood$Boy';

const router = express.Router();

//Route 1: Create user using: POST 'api/auth/createUser' no login required
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: "3" }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: "5",
    }),
  ],
  async (req, res) => {
    // If error return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if user exist with same email
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry this email already exist!" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);

      //Add user to DB
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });

      const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });

    } catch (error) {
        console.error(error.message);
        //Respond if something happen to server
        res.status(500).send("Internal server error");
    }
  }
);

//Route 2: Login user using: POST 'api/auth/login' no login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists()
  ],
  async (req, res) => {
    let success = false;
    // If error return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success, errors: errors.array() });
    }

    const {email, password} = req.body;

    try {
      let user = await User.findOne({email});
      if(!user){
        success = false;
        return res.status(400).json({ success, errors: "Please login with correct credencial" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        success = false;
        return res.status(400).json({ errors: "Please login with correct credencial" });
      }

      const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });

    } catch (error) {
      console.error(error.message);
      //Respond if something happen to server
      res.status(500).send("Internal server error");
    }

  });

//Route 3: Get Logedin user details using: POST 'api/auth/getUser' - login required
router.post("/getUser", fetchuser,
  async (req, res) => {

    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      //Respond if something happen to server
      res.status(500).send("Internal server error");
    }

  });


module.exports = router;
