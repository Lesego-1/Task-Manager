const pool = require('../config/db');

const createTask = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.userId;

    if (!title) return res.status(400).json({ error: 'Title is required' });

    try {
        const result = await pool.query(
            'INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
            [userId, title, description || '']
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};

const getTasks = async (req, res) => {
    const userId = req.user.userId

    try {
        const result = await pool.query(
            'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};

const updateTask = async (req, res) => {
    const taskId = req.params.id;
    const { title, description, completed} = req.body;
    const userId = req.user.userId;

    try {
        const check = await pool.query('SELECT * FROM tasks WHERE id = $1 AND user_id = $2', [taskId, userId]);
        if (check.rows.length === 0) return res.status(404).json({ error: 'Task not found' });

        const result = await pool.query(
            'UPDATE tasks SET title = $1, description = $2, completed - $3, updated_at = NOW() WHERE id = $4 RETURNING *',
            [title || check.rows[0].title, description || check.rows[0].description, completed ?? check.rows[0].completed, taskId]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
}

const deleteTask = async (req, res) => {
    const taskId = req.params.id;
    const userId = req.user.userId;

    try {
        const result = await pool.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *', [taskId, userId]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Task not found' });

        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
}

module.exports = { createTask, getTasks, updateTask, deleteTask };