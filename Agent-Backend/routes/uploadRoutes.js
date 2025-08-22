const express = require("express")
const multer = require("multer")
const path = require("path")

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"]
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error("Invalid file type! Only CSV, XLSX, or XLS files are allowed."), false)
  }
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

router.post("/upload-file", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "File upload failed. Only CSV/XLSX/XLS allowed." })
  }
  res.status(200).json({ message: "File uploaded successfully!", filename: req.file.filename })
})

module.exports = router
