const express = require('express');
const router = express.Router();
const {
  register,
  login,
  verifyOtp,
  profile,
  update
} = require('../controllers/studentController');
const middleWare = require('../middleware/authmiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);

router.get('/profile', middleWare, profile);
router.put('/update-name/:name', middleWare, update);

module.exports = router;
