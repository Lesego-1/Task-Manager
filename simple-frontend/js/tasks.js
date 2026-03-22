const TASK_API = "http://localhost:5000/api/tasks";
const USER_API = "http://localhost:5000/api/admin/users";
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token) window.location.href = "index.html";

const taskList = document.getElementById("task-list");
const userList = document.getElementById("user-list");
const adminPanel = document.getElementById("admin-panel");

async function fetchTasks() {
    const res = await fetch(TASK_API, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const tasks = await res.json();
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "bg-white p-4 rounded shadow flex flex-col gap-2 task-fade-in";
        li.innerHTML = `
            <div class="flex justify-between items-center">
                <h3 class="${task.completed ? 'line-through text-gray-400' : 'text-gray-800 font-bold'}">${task.title}</h3>
                <div class="flex gap-2">
                    <button class="complete-btn bg-green-500 text-white px-2 py-1 rounded">${task.completed ? 'Undo' : 'Done'}</button>
                    <button class="edit-btn bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                    <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </div>
            </div>
            <p class="text-gray-700">${task.description || ''}</p>
            <p class="text-sm text-gray-500">${task.dueDate ? 'Due: ' + new Date(task.dueDate).toLocaleDateString() : ''}</p>
        `;
        li.querySelector(".complete-btn").addEventListener("click", () => toggleComplete(task.id, !task.completed));
        li.querySelector(".edit-btn").addEventListener("click", () => editTask(task));
        li.querySelector(".delete-btn").addEventListener("click", () => deleteTask(task.id));
        taskList.appendChild(li);
    });
}

document.getElementById("add-task-form")?.addEventListener("submit", async e => {
    e.preventDefault();
    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-desc").value;
    const dueDate = document.getElementById("task-due").value;

    await fetch(TASK_API, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, description, dueDate })
    });

    document.getElementById("task-title").value = "";
    document.getElementById("task-desc").value = "";
    document.getElementById("task-due").value = "";
    fetchTasks();
});

async function toggleComplete(id, completed) {
    await fetch(`${TASK_API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ completed })
    });
    fetchTasks();
}

async function editTask(task) {
    const newTitle = prompt("Edit title:", task.title);
    if (!newTitle) return;
    const newDesc = prompt("Edit description:", task.description || '');
    const newDue = prompt("Edit due date (YYYY-MM-DD):", task.dueDate || '');
    await fetch(`${TASK_API}/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: newTitle, description: newDesc, dueDate: newDue })
    });
    fetchTasks();
}

async function deleteTask(id) {
    const li = [...taskList.children].find(li => li.querySelector(".delete-btn").onclick.toString().includes(id));
    if (li) {
        li.classList.add("task-fade-out");
        setTimeout(async () => {
            await fetch(`${TASK_API}/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
            fetchTasks();
        }, 300);
    }
}

// Admin Panel
async function fetchUsers() {
    if (role !== "admin") return;
    adminPanel.classList.remove("hidden");
    const res = await fetch(USER_API, { headers: { Authorization: `Bearer ${token}` } });
    const users = await res.json();
    userList.innerHTML = "";
    users.forEach(u => {
        const li = document.createElement("li");
        li.className = "bg-white p-3 rounded shadow flex justify-between";
        li.textContent = `${u.email} (${u.role})`;
        userList.appendChild(li);
    });
}

fetchTasks();
fetchUsers();