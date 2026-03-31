const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: false }, 
  weight: { type: Number },
  height: { type: Number },
  dailyCalorieGoal: { type: Number, default: 2000 },
  gender: { type: String, enum: ['male', 'female'] },
  dateOfBirth: { type: Date }, 
  goalType: { type: String, enum: ['maintain', 'lose', 'gain'] }, 
  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);