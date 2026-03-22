const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const authenticate = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.use(authenticate);

router.post('/', createTask);
router.get('/', getTasks);
router.put('/', updateTask);
router.delete('/:id', authorizeRoles('admin'), deleteTask)

module.exports = router;