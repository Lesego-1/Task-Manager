require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const authRoutes = require('./routes/authRoutes');
const authenticate = require('./middleware/authMiddleware');
const taskRoutes = require('./routes/taskRoutes');
const swaggerSetup = require('./config/swagger');

pool.query('SELECT NOW()', (err, res) => {
    if (err) console.error('DB connection error:', err);
    else console.log('Connected to Railway Postgres:', res.rows);
});

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use('/api/auth', authRoutes);
console.log(`Auth Routes: ${authRoutes}`)

swaggerSetup(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serer running on port ${PORT}`);
})