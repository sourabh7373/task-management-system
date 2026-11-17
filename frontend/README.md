# Task Management and Team Collaboration System

A full-stack Task Management application built using the MERN stack. It allows users to register, log in, create and manage tasks, track progress, and monitor completed and pending work through a dashboard.

## Features

### Authentication
- User registration and login
- Secure password hashing using bcrypt
- JWT-based authentication
- Protected routes
- Logout functionality

### Task Management
- Create, view, edit and delete tasks
- Update task status
- Set task priority
- Add task descriptions and due dates
- Manage individual user tasks

### Dashboard
- Total tasks
- Pending tasks
- In Progress tasks
- Completed tasks

### Search and Filtering
- Search tasks by title
- Filter by status
- Filter by priority
- Sort by due date and creation date

## Technology Stack

**Frontend**
- React.js
- Vite
- React Router
- Axios
- CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt / bcryptjs

## Project Structure

```text
task-management-system/
├── backend/
├── frontend/
├── screenshots/
├── postman/
├── .gitignore
└── README.md
```

## Installation and Setup

### Prerequisites
- Node.js and npm
- MongoDB Atlas account or local MongoDB
- Git

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd task-management-system
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm run dev
```

Use `npm start` instead if that is the start script defined in your backend package.json.

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the frontend URL displayed in your terminal, usually:

http://localhost:5173

## API Documentation

The Postman collection is available at:

`postman/Task-Management-API.postman_collection.json`

Import this file into Postman to test the backend APIs.

## Application Screenshots

### Registration
![Registration](screenshots/01-register.png)

### Login
![Login](screenshots/02-login.png)

### Dashboard
![Dashboard](screenshots/03-dashboard.png)

### My Tasks
![My Tasks](screenshots/04-my-tasks.png)

### Create Task
![Create Task](screenshots/05-create-task.png)

### Edit Task
![Edit Task](screenshots/06-edit-task.png)

### Completed Tasks
![Completed Tasks](screenshots/07-completed-tasks.png)

### Settings
![Settings](screenshots/08-settings.png)

## Security
- Passwords are hashed before storage.
- JWT authentication protects private routes.
- Users can access and modify only their own tasks.
- Environment variables are used for sensitive configuration.

## Author

Your Name

## License

This project was developed as part of a MERN Stack development assignment.