const mongoose = require('mongoose');

// Define schema
const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\+?\d{10,15}$/, 'Please enter a valid mobile number']
  },
  password: { type: String, required: true }
});

// Create model
const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;