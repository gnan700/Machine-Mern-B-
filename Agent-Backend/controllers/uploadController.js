const fs = require("fs")
const csv = require("csv-parser")
const xlsx = require("xlsx")
const Agent = require("../models/Agent")

const processCSV = async (filePath) => {
  return new Promise((resolve, reject) => {
    const results = []
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error))
  })
}

const processExcel = async (filePath) => {
  const workbook = xlsx.readFile(filePath)
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]
  return xlsx.utils.sheet_to_json(sheet)
}
const distributeTasks = async (tasks) => {
  const agents = await Agent.find()
  if (agents.length === 0) {
    throw new Error("No agents found");
  }

  let agentIndex = 0;
  for (let i = 0; i < tasks.length; i++) {
    agents[agentIndex].tasks.push(tasks[i])
    agentIndex = (agentIndex + 1) % agents.length;
  }

  await Promise.all(agents.map((agent) => agent.save()))
};

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" })
    }
    let tasks = []
    if (req.file.mimetype === "text/csv") {
      tasks = await processCSV(req.file.path)
    } else {
      tasks = await processExcel(req.file.path)
    }
    await distributeTasks(tasks);
    res.status(200).json({ message: "File processed and tasks assigned successfully" })
  } catch (error) {
    console.error("File upload error:", error)
    res.status(500).json({ error: "Error processing file" })
  }
}
