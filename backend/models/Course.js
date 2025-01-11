const mongoose = require('mongoose');

const LectureSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' },
});

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  lectures: [LectureSchema],
});

module.exports = mongoose.model('Course', CourseSchema);