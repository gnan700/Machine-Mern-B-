const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
  },
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/csv" || 
      file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || 
      file.mimetype === "application/vnd.ms-excel") {
    cb(null, true)
  } else {
    cb(new Error("Invalid file type. Only CSV, XLSX, and XLS allowed."), false)
  }
}

const upload = multer({ storage, fileFilter })

module.exports = upload
