import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { logout, getUser } from '../services/auth';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const navigate = useNavigate();

    const user = getUser();
    const isAdmin = user?.role === 'admin';

    const loadTasks = async () => {
        try {
            const res = await API.get('/tasks');
            setTasks(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        loadTasks()
    }, []);

    const addTask = async () => {
        await API.post('/tasks', { title });
        setTitle('');
        loadTasks();
    }

    const updateTask = async (id) => {
        await API.put(`/tasks/${id}`, { title });
        setTitle('');
        setEditingTask(null);
        loadTasks();
    }

    const deleteTask = async (id) => {
        await API.delete(`/tasks/${id}`);
        loadTasks();
    }

    const toggleComplete = async (task) => {
        await API.put(`/tasks/${task.id}`, {
        ...task,
        completed: !task.completed,
        })
        loadTasks();
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md">

            <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <button
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                onClick={handleLogout}
            >
                Logout
            </button>
            </div>

            {isAdmin && <h3 className="text-lg font-semibold mb-2">Admin Panel</h3>}

            <div className="flex gap-2 mb-4">
            <input
                className="flex-1 border p-2 rounded"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={editingTask ? () => updateTask(editingTask) : addTask}
            >
                {editingTask ? 'Update' : 'Add'}
            </button>
            </div>

            <ul>
            {tasks.map((task) => (
                <li
                key={task.id}
                className="flex justify-between items-center p-2 border-b transition-all duration-300 hover:scale-105"
                >
                <span className={task.completed ? 'line-through text-gray-400' : ''}>
                    {task.title}
                </span>

                <div className="flex gap-2">
                    <button
                    className="text-green-500"
                    onClick={() => toggleComplete(task)}
                    >
                    {task.completed ? 'Undo' : '✓'}
                    </button>

                    <button
                    className="text-yellow-500"
                    onClick={() => {
                        setTitle(task.title)
                        setEditingTask(task.id)
                    }}
                    >
                    Edit
                    </button>

                    <button
                    className="text-red-500"
                    onClick={() => deleteTask(task.id)}
                    >
                    Delete
                    </button>
                </div>
                </li>
            ))}
            </ul>
        </div>
        </div>
    )
}

export default Dashboard;