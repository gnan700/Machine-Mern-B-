const express = require("express");
const { uploadCSV, getLists } = require("../controllers/listController")

const router = express.Router()

router.post("/upload", uploadCSV)
router.get("/", getLists)

module.exports = router
