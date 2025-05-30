const student = require('../models/student');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = "your_jwt_secret_key"; // Use process.env.JWT_SECRET in production

const register = async (req, res) => {
  try {
    const { name, email, password, hallticketNo, branch } = req.body;

    const studentExist = await student.findOne({ email });
    if (studentExist) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const newStudent = new student({
      name,
      email,
      password: hashedPassword,
      hallticketNo,
      branch
    });

    await newStudent.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingStudent = await student.findOne({ email });
    if (!existingStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const passwordMatch = await bcrypt.compare(password, existingStudent.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: existingStudent._id, email: existingStudent.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { register, login };
