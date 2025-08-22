const multer = require("multer")
const csvParser = require("csv-parser")
const fs = require("fs")
const List = require("../models/List")
const Agent = require("../models/Agent")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

const upload = multer({ 
  storage, 
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "text/csv" || 
        file.mimetype === "application/vnd.ms-excel" ||
        file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      cb(null, true)
    } else {
      cb(new Error("Only CSV, XLSX, and XLS files are allowed"))
    }
  }
}).single("file")

exports.uploadCSV = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message })
    const filePath = req.file.path
    const results = []

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          const agents = await Agent.find();
          if (agents.length === 0) return res.status(400).json({ error: "No agents found" })
          let index = 0
          for (const row of results) {
            const assignedAgent = agents[index % agents.length]._id
            const newItem = new List({
              firstName: row.FirstName,
              phone: row.Phone,
              notes: row.Notes,
              assignedAgent
            })
            await newItem.save()
            index++
          }
          res.json({ message: "CSV uploaded and distributed successfully" })
        } catch (error) {
          res.status(500).json({ error: "Internal Server Error" })
        }
      })
  })
}

exports.getLists = async (req, res) => {
  try {
    const lists = await List.find().populate("assignedAgent", "name email")
    res.json(lists)
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" })
  }
}