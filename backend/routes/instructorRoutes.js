const express = require('express');
const { getLectures } = require('../controllers/instructorController');
const { verifyToken, verifyInstructor } = require('../middlewares/auth');

const router = express.Router();


router.use(verifyToken, verifyInstructor);


router.get('/:instructorId/lectures', getLectures);

module.exports = router;
