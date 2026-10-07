# Student Course Management and Learning Progress Tracking System

## Project Overview

The **Student Course Management and Learning Progress Tracking System** is a full-stack web application designed to streamline academic course enrollment and learning management. The system allows students to create accounts, browse available courses, enroll in courses, access course materials, track their learning progress, and receive updates regarding their courses.

The application also provides administrators with tools to manage students, courses, enrollments, and progress reports.

This project demonstrates key concepts in Full Stack Web Development, including frontend development, backend APIs, database management, authentication, deployment, and application security.

---

## Problem Statement

In many educational institutions, students face challenges such as:

- Finding available courses
- Registering for courses efficiently
- Monitoring learning progress
- Accessing course information in one place
- Tracking completed and pending modules

Similarly, administrators often encounter difficulties in managing course enrollments and monitoring student performance.

This system addresses these challenges by providing a centralized web-based platform for academic course management and progress tracking.

---

## Project Objectives

- Provide secure student registration and login.
- Allow students to browse and enroll in available courses.
- Enable administrators to create and manage courses.
- Track student learning progress.
- Generate progress reports.
- Provide real-time notifications and updates.
- Maintain secure access to academic data.

---

## User Roles

### Student

Students can:

- Register and log in
- View their profile
- Browse available courses
- Enroll in courses
- Access course content
- Track learning progress
- View course completion percentage
- Receive notifications

### Administrator

Administrators can:

- Log in securely
- Add, edit, and delete courses
- Manage student records
- Monitor enrollments
- Generate reports
- Update course content
- View analytics dashboards

---

## System Modules

### Module 1: User Authentication

#### Features

- Student Registration
- Student Login
- Password Encryption
- Forgot Password
- JWT Authentication

#### Database Fields

| Field | Type |
|--------|------|
| Student ID | Integer |
| Name | String |
| Email | String |
| Password | Encrypted String |
| Department | String |

---

### Module 2: Course Management

#### Features

- Add Course
- Update Course
- Delete Course
- View Course Details

#### Course Information

| Field | Description |
|--------|-------------|
| Course ID | Unique ID |
| Course Name | Course Title |
| Instructor | Faculty Name |
| Duration | Number of Weeks |
| Description | Course Information |
| Category | Programming, AI, Web, etc. |

---

### Module 3: Course Enrollment

#### Features

- Browse Courses
- Search Courses
- Enroll in Course
- View Enrolled Courses

#### Workflow

```
Student Login
      ↓
Browse Courses
      ↓
Select Course
      ↓
Enroll
      ↓
Confirmation
```

---

### Module 4: Learning Management

#### Features

- View Modules
- Access Learning Materials
- Mark Module as Completed
- Continue Learning

#### Example Course Structure

**Course:** Full Stack Development

Modules:

- HTML
- CSS
- JavaScript
- React
- Node.js
- MongoDB

Students complete each module sequentially while their progress is automatically recorded.

---

### Module 5: Progress Tracking

#### Features

- Completion Percentage
- Course Progress Bar
- Completed Modules
- Pending Modules

#### Example

| Course | Progress |
|---------|----------|
| Python | 80% |
| React | 60% |
| DBMS | 100% |

---

### Module 6: Dashboard

#### Student Dashboard

Displays:

- Total Courses Enrolled
- Courses Completed
- Ongoing Courses
- Progress Statistics

#### Administrator Dashboard

Displays:

- Total Students
- Total Courses
- Active Enrollments
- Completion Reports

---

### Module 7: Notifications

#### Features

- New Course Alerts
- Enrollment Confirmation
- Assignment Reminders
- Completion Certificates

#### Real-Time Communication

- WebSockets
- Socket.IO

---

## Database Design

### Students Table

| Field |
|--------|
| student_id |
| name |
| email |
| password |
| department |

### Courses Table

| Field |
|--------|
| course_id |
| course_name |
| instructor |
| duration |
| description |

### Enrollment Table

| Field |
|--------|
| enrollment_id |
| student_id |
| course_id |
| enrollment_date |

### Progress Table

| Field |
|--------|
| progress_id |
| student_id |
| course_id |
| completed_modules |
| progress_percentage |

---

## Technology Stack

| Layer | Technology |
|--------|------------|
| Frontend | HTML5, CSS3, Bootstrap, JavaScript, React.js |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | JWT, bcrypt |
| Real-Time Communication | Socket.IO |
| API Testing | Postman |
| Version Control | Git, GitHub |
| Deployment | Render / Vercel / Railway |

---

## Project Highlights

- Secure user authentication using JWT and bcrypt
- Course browsing and enrollment system
- Learning progress monitoring
- Administrator management dashboard
- Real-time notifications using Socket.IO
- MongoDB database integration
- RESTful API architecture
- Responsive user interface
- Deployment-ready full-stack application

---

## Running with the Mock API (React frontend)

The React app no longer uses `localStorage` / `sessionStorage`. All data (courses, students,
admins, enrollments, learning progress and the login session) is stored in
`mock-api/db.json` and served by [json-server](https://github.com/typicode/json-server).

```
course-management-system-edubloom-main/
├── frontend/          (original static HTML version - unchanged)
├── react-frontend/    (React app)
└── mock-api/
    └── db.json        (mock database)
```

Open **two terminals**:

```bash
# Terminal 1 - Mock API  ->  http://localhost:5000
cd mock-api
npm install
npm start

# Terminal 2 - React app ->  http://localhost:5173
cd react-frontend
npm install
npm run dev
```

Demo accounts (already in `db.json`):

| Role    | Email                  | Password     |
| ------- | ---------------------- | ------------ |
| Student | `student@edubloom.com` | `student123` |
| Admin   | `admin@edubloom.com`   | `admin123`   |

### What was added / changed

| File | Change |
| ---- | ------ |
| `mock-api/db.json` | New. `courses` (10 courses), `students`, `admins`, `enrollments`, `session` |
| `src/services/api.js` | New. axios instance, `baseURL: http://localhost:5000` |
| `src/context/CourseContext.jsx` | New. `courses`, `loading`, `error`, `fetchCourses`, `addCourse`, `updateCourse`, `deleteCourse` |
| `src/main.jsx` | Wrapped `<App />` in `<CourseProvider>` |
| `src/pages/Courses.jsx` | Course cards now come from `useCourses()` (loading / error / search) |
| `src/auth/AuthContext.jsx` | Login state read from / written to the API `session` |
| `src/components/CourseCard.jsx`, `Navbar.jsx` | No localStorage; logout clears the API session |
| `public/legacy/js/api.js` | Now a fetch-based helper (`window.EduAPI`) instead of localStorage helpers |
| `public/legacy/js/*.js` | Every page script reads / writes the API |

### Notes

* Change the API address in **both** `src/services/api.js` and `BASE_URL` at the top of
  `public/legacy/js/api.js` if you run json-server on another port.
* Course pages are opened with the course id in the URL, e.g. `/course-details?id=1`.
* Deleting a course also deletes its enrollments (`?_dependent=enrollments`).
* Courses saved as **Draft** or **Inactive** are hidden from students.
* Passwords are stored in plain text in `db.json`. This is a mock for development only.
* `make_react_pages.py` regenerates the React pages from `frontend/` and would overwrite these changes; do not re-run it.

---

## Architecture (Node.js + Express layer)

```
React (5173)  ->  Express (3001, /api)  ->  JSON Server (5000)  ->  mock-api/db.json
```

All frontend data requests go to `http://localhost:3001/api/...`. Express forwards them
to JSON Server (`/api/courses` -> `http://localhost:5000/courses`). JSON Server and
`db.json` are unchanged.

Run in three terminals (run `npm install` once in each folder):

```bash
cd mock-api       && npm start      # JSON Server -> http://localhost:5000
cd backend        && npm start      # Express     -> http://localhost:3001/api
cd react-frontend && npm run dev    # React       -> http://localhost:5173
```

Frontend API base URLs live in `react-frontend/src/services/api.js` and
`react-frontend/public/legacy/js/api.js` (both point at `http://localhost:3001/api`).
