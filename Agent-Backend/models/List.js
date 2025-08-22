const mongoose = require("mongoose")

const listSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  notes: { 
    type: String, 
    required: true 
  },
  assignedAgent: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Agent" 
  }
});

module.exports = mongoose.model("List", listSchema)