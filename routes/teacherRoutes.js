const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherControllers');

// GET all teachers
router.get('/', teacherController.getAllTeachers);

// GET teacher by ID
router.get('/:id', teacherController.getTeacherById);

// POST create new teacher
router.post('/', teacherController.createTeacher);

// PUT update teacher by ID
router.put('/:id', teacherController.updateTeacher);

// DELETE delete teacher by ID
router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;
