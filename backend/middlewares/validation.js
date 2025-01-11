const { body, param, validationResult } = require('express-validator');


const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


const validateCourse = [
  body('name').notEmpty().withMessage('Course name is required'),
  body('level').notEmpty().withMessage('Course level is required'),
  validateRequest,
];

const validateLecture = [
  body('courseId').notEmpty().withMessage('Course ID is required'),
  body('instructorId').notEmpty().withMessage('Instructor ID is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  validateRequest,
];


const validateInstructor = [
  body('name').notEmpty().withMessage('Instructor name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  validateRequest,
];

module.exports = { validateCourse, validateLecture, validateInstructor };
