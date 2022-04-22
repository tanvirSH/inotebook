const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const router = express.Router();

//Create user using: POST 'api/auth/createUser' no login required

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

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.json({ success: user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
  }
);

router.get("/", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

module.exports = router;
