const mongoose = require('mongoose');

const punchLogSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true
  },
  punchIn: Date,
  punchOut: Date,
  duration: String
});

module.exports = mongoose.model('PunchLog', punchLogSchema);
