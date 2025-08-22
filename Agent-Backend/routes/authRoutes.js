const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const { login, register } = require("../controllers/authController")

const router = express.Router()

router.post("/login", login)

router.post('/register', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({ error: "All fields are required!" })
    }
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists!" })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({ name, username, email, password: hashedPassword })
    await newUser.save()

    res.status(201).json({ message: "User registered successfully!" })

  } catch (error) {
    console.error("Registration Error:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})


module.exports = router
