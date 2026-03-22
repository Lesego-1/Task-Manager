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

### Task Details
![Task Details](path/to/task-details.png)

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

It’s ideal for showcasing to **recruiters, hiring managers, or technical leads** as evidence of your ability to deliver a **full-stack, production-ready web application**.
