const Course = require('../models/Course');
const Instructor = require('../models/Instructor');
const mongoose = require('mongoose');


exports.addCourse = async (req, res) => {
  try {
    const { name, level, description, image } = req.body;
    const newCourse = new Course({ name, level, description, image });
    await newCourse.save();
    res.status(201).json({ message: 'Course added successfully', course: newCourse });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add course', error: error.message });
  }
};


exports.assignLecture = async (req, res) => {
  try {
    const { courseId, instructorId, date } = req.body;

    
    const existingLecture = await Course.findOne({
      'lectures.date': date,
      'lectures.instructor': new mongoose.Types.ObjectId(instructorId), 
    });

    if (existingLecture) {
      return res.status(400).json({ message: 'Instructor already assigned to another lecture on this date' });
    }

    const course = await Course.findById(courseId);
    const instructor = await Instructor.findById(instructorId);

    if (!course || !instructor) {
      return res.status(404).json({ message: 'Course or instructor not found' });
    }

    
    course.lectures.push({ date, instructor: new mongoose.Types.ObjectId(instructorId) });  
    await course.save();

    res.status(200).json({ message: 'Lecture assigned successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Failed to assign lecture', error: error.message });
  }
};


exports.addInstructor = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newInstructor = new Instructor({ name, email });
    await newInstructor.save();
    res.status(201).json({ message: 'Instructor added successfully', instructor: newInstructor });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add instructor', error: error.message });
  }
};


exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({}, '_id name level'); 
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch courses', error: error.message });
  }
};



exports.getInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find({}, '_id name email'); 
    res.status(200).json({ instructors });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch instructors', error: error.message });
  }
};


exports.viewAllCourses = async (req, res) => {
  try {
  
    const courses = await Course.aggregate([
      { $unwind: '$lectures' }, 
      { $sort: { 'lectures.date': 1 } }, 
      {
        $lookup: {
          from: 'instructors',
          localField: 'lectures.instructor',
          foreignField: '_id',
          as: 'instructorDetails',
        },
      },
      { $unwind: '$instructorDetails' }, 
      {
        $project: {
          _id: 1,
          name: 1,
          level: 1,
          lectures: 1,
          instructor: '$instructorDetails.name',
          instructorEmail: '$instructorDetails.email',
        },
      },
    ]);

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: 'No courses found' });
    }

    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch courses', error: error.message });
  }
};