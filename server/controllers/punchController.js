const PunchLog = require('../models/punchLog');
const moment = require('moment');

// PUNCH IN
const punchIn = async (req, res) => {
  try {
    const employeeId = req.user._id;
    const today = moment().format('YYYY-MM-DD');

    const existingLog = await PunchLog.findOne({ employee: employeeId, date: today });

    if (existingLog && existingLog.punchIn) {
      return res.status(400).json({ msg: 'Already punched in today' });
    }

    const punchLog = existingLog || new PunchLog({ employee: employeeId, date: today });
    punchLog.punchIn = new Date();
    await punchLog.save();

    res.status(200).json({
      msg: 'Punched in successfully',
      punchLog
    });
  } catch (error) {
    console.error('Punch In Error:', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

// PUNCH OUT
const punchOut = async (req, res) => {
  try {
    const employeeId = req.user._id;
    const today = moment().format('YYYY-MM-DD');

    const punchLog = await PunchLog.findOne({ employee: employeeId, date: today });

    if (!punchLog || !punchLog.punchIn) {
      return res.status(400).json({ msg: 'Punch in first' });
    }

    punchLog.punchOut = new Date();

    // Calculate Duration
    const durationMs = punchLog.punchOut - punchLog.punchIn;
    const totalSeconds = Math.floor(durationMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    punchLog.duration = `${hours}h ${minutes}m ${seconds}s`;

    await punchLog.save();

    res.status(200).json({
      msg: 'Punched out successfully',
      punchLog,
      employeeName: req.user.name
    });
  } catch (error) {
    console.error('Punch Out Error:', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

module.exports = { punchIn, punchOut };
