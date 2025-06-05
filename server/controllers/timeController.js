const Punch = require('../models/punch');  // Model naming in PascalCase is a good practice

const punchInOutTime = async (req, res) => {
  try {
    const { time } = req.body;
    if (!time) {
      return res.status(400).json({ msg: 'Time is required' });
    }

    // Check if there is already a punch-in record for the given time (or any logic you want)
    const status = await Punch.findOne({ punchin: new Date(time) });
    if (status) {
      return res.status(400).json({ msg: 'Punch data already exists for this time' });
    }

    // Create new punch record
    const newPunch = new Punch({
      punchin: new Date(time),
    });

    await newPunch.save();

    res.json({ msg: 'Punch data saved successfully', data: newPunch });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {punchInOutTime};
