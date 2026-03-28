const TASK_API = "http://localhost:5000/api/tasks";
const USER_API = "http://localhost:5000/api/admin/users";
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token) window.location.href = "index.html";

const taskList = document.getElementById("task-list");
const userList = document.getElementById("user-list");
const adminPanel = document.getElementById("admin-panel");

async function fetchTasks() {
    try {
        const res = await fetch(TASK_API, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch tasks");
        }

        const tasks = await res.json();

        taskList.innerHTML = "";

        // Show empty state if no tasks
        if (tasks.length === 0) {
            document.getElementById("empty-state").classList.remove("hidden");
            return;
        } else {
            document.getElementById("empty-state").classList.add("hidden");
        }

        tasks.forEach(task => {
            const li = document.createElement("li");

            li.className = "task-card flex flex-col gap-3 p-4 rounded-xl bg-white/70 backdrop-blur-md shadow-md hover:shadow-lg transition task-fade-in";

            li.innerHTML = `
                <div class="flex items-start justify-between">
                    <div class="flex items-start gap-3">
                        <div>
                            <h3 class="font-bold text-[#2D3748] text-lg ${task.completed ? 'line-through text-gray-400' : ''}">
                                ${task.title}
                            </h3>

                            <p class="text-gray-600 text-sm mt-1">
                                ${task.description || "No description"}
                            </p>
                        </div>
                    </div>

                    <div class="flex gap-2">
                        <button class="complete-btn p-2 rounded-lg hover:bg-green-100 transition text-green-600">
                            ${task.completed ? '↩' : '✓'}
                        </button>

                        <button class="edit-btn p-2 rounded-lg hover:bg-[#BADFFF]/30 transition text-[#7FC3FF]">
                            <i data-lucide="edit-2" class="w-4 h-4"></i>
                        </button>

                        <button class="delete-btn p-2 rounded-lg hover:bg-[#FFCCDE]/30 transition text-[#E04582]">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            `;

            // ✅ Attach events (CRITICAL)
            li.querySelector(".complete-btn").addEventListener("click", async () => {
                await toggleComplete(task.id, !task.completed);
            });

            li.querySelector(".edit-btn").addEventListener("click", async () => {
                await editTask(task);
            });

            li.querySelector(".delete-btn").addEventListener("click", async () => {
                li.classList.add("task-fade-out");

                setTimeout(async () => {
                    await deleteTask(task.id);
                }, 300);
            });

            taskList.appendChild(li);
        });

        // Refresh icons
        if (window.lucide) {
            lucide.createIcons();
        }

    } catch (err) {
        console.error("FetchTasks Error:", err);
    }
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

    const res = await fetch(`${TASK_API}/${task.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            title: newTitle,
            description: newDesc
        })
    });

    const data = await res.json();
    console.log(data);

    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${TASK_API}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
    });

    fetchTasks();
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