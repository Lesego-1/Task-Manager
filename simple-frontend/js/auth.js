const API_URL = "http://localhost:5000/api/auth";

function checkTokenExpiry() {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp;
        const now = Math.floor(Date.now() / 1000);
        if (exp < now) {
            alert("Session expired. Please login again.");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            window.location.href = "index.html";
        }
    } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "index.html";
    }
}

checkTokenExpiry();
setInterval(checkTokenExpiry, 30000);

document.getElementById("login-form")?.addEventListener("submit", async e => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
            window.location.href = "dashboard.html";
        } else {
            alert(data.error);
        }
    } catch (err) {
        console.error(err);
    }
});

document.getElementById("register-form")?.addEventListener("submit", async e => {
    e.preventDefault();
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;

    try {
        const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (data.message) {
            alert("Registered! Please login.");
            window.location.href = "index.html";
        } else {
            alert(data.error);
        }
    } catch (err) {
        console.error(err);
    }
});

document.getElementById("logout-btn")?.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "index.html";
});