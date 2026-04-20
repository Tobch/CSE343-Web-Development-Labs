const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// 1. CREATE a new course (POST)
router.post('/', async (req, res) => {
    try {
        const course = new Course(req.body);
        const savedCourse = await course.save();
        res.status(201).json(savedCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 2. READ all courses (GET)
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. READ a single course by ID (GET)
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. UPDATE a course by ID (PUT)
router.put('/:id', async (req, res) => {
    try {
        // { new: true } returns the updated document, runValidators ensures data rules are kept
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });
        res.json(updatedCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 5. DELETE a course by ID (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) return res.status(404).json({ message: 'Course not found' });
        res.status(204).send(); // 204 No Content means successful deletion
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;