const express = require('express');
const { addCourse, assignLecture, addInstructor, getCourses, getInstructors, viewAllCourses } = require('../controllers/adminController');
const { validateCourse, validateLecture, validateInstructor } = require('../middlewares/validation');
const { verifyToken, verifyAdmin } = require('../middlewares/auth');
const Course = require('../models/Course'); 

const router = express.Router();


// router.use(verifyToken, verifyAdmin);



router.post('/add-course', validateCourse, addCourse);


router.post('/assign-lecture', validateLecture, assignLecture);


router.post('/add-instructor', validateInstructor, addInstructor);


router.get('/courses', async (req, res) => {
    try {
      const courses = await Course.find({}, '_id name level'); // Select only relevant fields
      res.status(200).json({ courses });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch courses', error: error.message });
    }
  });



router.get('/instructors', getInstructors);
  

router.get('/allCourses', viewAllCourses);
  

module.exports = router;
