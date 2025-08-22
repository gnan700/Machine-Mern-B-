const bcrypt = require("bcryptjs")
const Agent = require("../models/Agent")

exports.addAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existingAgent = await Agent.findOne({ email })
    if (existingAgent) {
      return res.status(400).json({ error: "Agent already exists" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newAgent = new Agent({ name, email, mobile, password: hashedPassword })
    await newAgent.save()
    res.status(201).json({ message: "Agent added successfully", agent: newAgent })
  } catch (error) {
    console.error("Add Agent Error:", error.message)
    res.status(500).json({ error: "Internal Server Error", details: error.message })
  }
}
exports.getAgents = async (req, res) => {
  try {
    const agents = await Agent.find().select("-password")
    res.status(200).json(agents)
  } catch (error) {
    console.error("Get Agents Error:", error.message);
    res.status(500).json({ error: "Internal Server Error", details: error.message })
  }
}
