const express = require("express")
const Agent = require("../models/Agent")

const router = express.Router()

router.get("/list", async (req, res) => {
  try {
    const agents = await Agent.find()
    res.status(200).json(agents)
  } catch (error) {
    console.error("Error fetching agents:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.post("/add", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ error: "All fields are required" })
    }
    const existingAgent = await Agent.findOne({ email })
    if (existingAgent) {
      return res.status(400).json({ error: "Agent with this email already exists" })
    }
    const newAgent = new Agent({ name, email, mobile, password })
    await newAgent.save()
    res.status(201).json({ message: "Agent added successfully!" })
  } catch (error) {
    console.error("Agent creation error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router
