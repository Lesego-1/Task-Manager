# Task Manager with Authentication and Role-Based Access

A **full-featured web-based Task Manager** designed to streamline task organization, improve productivity, and enforce secure access controls. Built with **vanilla JavaScript, HTML, CSS, Node.js, Express, and PostgreSQL**, this system demonstrates robust backend logic, secure authentication, role-based access control, and a modern, responsive UI using Tailwind CSS.

---

## Overview

The Task Manager allows users to register, log in, and manage tasks with details including **title, description, due date, and completion status**. Admin users have elevated privileges to manage all users and tasks, ensuring controlled access across the system.

This project highlights:

- **Security**: JWT-based authentication, password hashing, protected routes.
- **Role-Based Access**: Distinct permissions for standard users and administrators.
- **Task Management**: Create, read, update, delete (CRUD) functionality for tasks with rich metadata.
- **Responsive, Modern UI**: Styled with Tailwind CSS, featuring card layouts, animations, and interactive forms.
- **Seamless API Integration**: Frontend interacts with backend endpoints through vanilla JS fetch calls.

---

## Features

- **Authentication System**
  - Secure user registration and login
  - Password hashing and JWT token generation
  - Protected routes to enforce access control

- **Task System**
  - Create tasks with **title, description, and due date**
  - Edit, delete, and mark tasks as complete
  - User-specific task visibility

- **Role-Based Access Control**
  - Admin panel rendered dynamically based on role
  - Admins can view and manage all users and tasks
  - Standard users can manage only their own tasks

- **Frontend**
  - Modern, responsive layout using Tailwind CSS
  - Forms with validation and focus effects
  - Animated task creation and completion interactions

- **Backend**
  - Node.js + Express RESTful API
  - PostgreSQL database for persistent storage
  - JWT token validation and middleware
  - Structured codebase with controllers, routes, and middleware

---

## Project Impact

This Task Manager is a **full-stack demonstration of web development best practices**:

- **Security**: Shows ability to implement authentication, secure password handling, and role-based access control.
- **Scalability**: Clear separation of concerns between frontend and backend, modular API design.
- **User Experience**: Responsive and interactive UI, modern card-style task layout, smooth animations.
- **Professional Readiness**: Demonstrates skills applicable to real-world enterprise applications, including API integration, state management with vanilla JS, and backend database design.

---

## Screenshots

### Login Page
![Login Page](path/to/login-screenshot.png)

### Register Page
![Register Page](path/to/register-screenshot.png)

### Dashboard
![Dashboard](path/to/dashboard-user.png)

### Swagger API - Auth Endpoints
#### Register
![Swagger Register Endpoint](path/to/swagger-register.png)

#### Login
![Swagger Login Endpoint](path/to/swagger-login.png)

### Swagger API - Task Endpoints
#### Create Task
![Swagger Create Task Endpoint](path/to/swagger-create-task.png)

#### Get Tasks
![Swagger Get Tasks Endpoint](path/to/swagger-get-tasks.png)

#### Update Task
![Swagger Update Task Endpoint](path/to/swagger-update-task.png)

#### Delete Task
![Swagger Delete Task Endpoint](path/to/swagger-delete-task.png)

---

## Technical Highlights

- **JWT Authentication**: Tokens secure user sessions and enforce route protection.
- **Password Security**: Hashing with bcrypt ensures user credentials are never stored in plaintext.
- **Task Metadata**: Each task includes title, description, due date, completion status, and ownership.
- **Dynamic UI**: Admin panel and task lists render based on user role and real-time API data.
- **Vanilla JavaScript API Integration**: All frontend pages interact with backend endpoints using `fetch`, without frameworks.
- **Tailwind CSS Styling**: Modern, responsive, and animated UI elements across all pages.

---

## Why This Project Stands Out

This project demonstrates **end-to-end full-stack skills** without relying on heavy frontend frameworks. It combines:

- **Security best practices** for authentication and authorization
- **Responsive, professional UI** that mirrors modern SaaS platforms
- **Clean, maintainable backend code** with modular controllers and middleware
- **Practical database integration** with PostgreSQL for production-ready data management

---

## 🚧 Current Application Status

### ✅ Backend Functionality (Fully Working)

All core task management features are **fully functional on the backend** and have been successfully tested using tools like **Postman** and direct API requests.

The following endpoints work as expected:

* **Create Task** → `POST /api/tasks`
* **Get Tasks** → `GET /api/tasks`
* **Update Task** → `PUT /api/tasks/:id`
* **Delete Task** → `DELETE /api/tasks/:id`

✔ Tasks are correctly:

* Created and stored in the database
* Retrieved per authenticated user
* Updated with new values
* Deleted successfully

Authentication using JWT is also working correctly, and protected routes behave as expected.

---

### 🟡 Frontend Functionality (Partially Working)

The frontend UI is mostly functional and successfully integrates with the backend for:

* ✅ Creating tasks
* ✅ Fetching and displaying tasks

However, the following features are **currently not working as expected in the UI**:

* ❌ Editing tasks (UI interaction does not persist changes)
* ❌ Deleting tasks (button interaction does not trigger expected behavior)

> ⚠️ Important: These features **do work on the backend**, but there is an issue with the frontend event handling or API interaction that still needs to be resolved.

---

### 🔧 Next Steps

* Debug frontend event listeners for edit and delete buttons
* Verify API requests in the browser (Network tab)
* Ensure correct DOM bindings and data flow
* Replace prompt-based editing with a proper UI modal (planned improvement)

---

### 🧪 Testing Notes

All backend endpoints were tested using:

* Postman
* Manual HTTP requests

Frontend testing is ongoing in the browser.

---

### 📌 Summary

| Feature     | Backend | Frontend |
| ----------- | ------- | -------- |
| Create Task | ✅       | ✅        |
| View Tasks  | ✅       | ✅        |
| Edit Task   | ✅       | ❌        |
| Delete Task | ✅       | ❌        |
