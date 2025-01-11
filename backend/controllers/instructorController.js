const Course = require('../models/Course');


exports.getLectures = async (req, res) => {
  try {
    const { instructorId } = req.params;
    const lectures = await Course.find({ 'lectures.instructor': instructorId }, 'name lectures')
      .populate('lectures.instructor', 'name email')
      .exec();

    res.status(200).json({ lectures });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch lectures', error: error.message });
  }
};