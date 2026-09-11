const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask, getTaskById } = require('../controllers/task.controller');
const { protect } = require('../middleware/auth.middleware');

router.route('/').get(protect, getTasks).post(protect, createTask);
router.route('/:id').get(protect, getTaskById).put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;
