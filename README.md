# Student Project Showcase Board

A full-stack web application for showcasing student projects with authentication, project management, and a responsive design.

## Features

- **Frontend**: React + Vite with CSS Modules
- **Backend**: Node.js + Express + MySQL
- **Authentication**: JWT with role-based access (student/admin)
- **Project Management**: Add, view, filter, and search projects
- **Responsive Design**: Works on desktop and mobile

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MySQL Server
- Git

### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Database Setup

1. Start MySQL server
2. Create the database and tables:

```bash
mysql -u root -p < ../database/setup.sql
```

Or manually in MySQL:

```sql
CREATE DATABASE student_showcase;
USE student_showcase;
-- Run the SQL commands from database/setup.sql
```

### 3. Environment Configuration

Update the database credentials in `backend/config/db.js` if needed:

```javascript
const db = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "your_mysql_password", // Update if you have a password
   database: "student_showcase",
});
```

### 4. Running the Application

#### Development Mode

1. Start the backend server:

```bash
cd backend
npm run dev  # or npm start
```

2. Start the frontend development server:

```bash
cd frontend
npm run dev
```

The app will be available at:

- Frontend: http://localhost:5180
- Backend API: http://localhost:5001

#### Production Build

```bash
# Build frontend
cd frontend
npm run build

# Start backend
cd ../backend
npm start
```

## Project Structure

```
student-showcase-board/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context
│   │   └── data/            # Mock data
│   └── vite.config.js       # Vite configuration
├── backend/                 # Node.js backend
│   ├── config/              # Database configuration
│   ├── routes/              # API routes
│   ├── server.js            # Main server file
│   └── package.json
├── database/                # Database setup files
└── README.md
```

## API Endpoints

### Authentication

- `POST /api/register` - Register new user
- `POST /api/login` - User login

### Projects

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Add new project (requires auth)

## Technologies Used

- **Frontend**: React 18, Vite, Axios, CSS Modules
- **Backend**: Node.js, Express.js, MySQL2, JWT, bcryptjs
- **Database**: MySQL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
