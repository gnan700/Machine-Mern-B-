const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const bodyParser = require('body-parser')
const cors = require("cors")

const listRoutes = require("./routes/listRoutes.js")
const authRoutes = require("./routes/authRoutes")
const agentsRoutes = require("./routes/agentRoutes.js")
const uploadRoutes = require("./routes/uploadRoutes")

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json()) 
app.use(bodyParser.urlencoded({ extended: true }))


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err))

app.use("/api/lists", listRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/agents", agentsRoutes)
app.use("/api/upload", uploadRoutes)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
