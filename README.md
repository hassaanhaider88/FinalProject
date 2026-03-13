# Learning Management System (LMS)

This project is a full-stack Learning Management System (LMS) designed to facilitate online education. It provides functionalities for user authentication with different roles (student, instructor, admin), course creation and management, student enrollment, and progress tracking, all delivered through a responsive web interface.

## Tech Stack

### Frontend

- **Language**: ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
- **Framework**: ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- **Build Tool**: ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
- **Styling**: ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white), ![React Bootstrap](https://img.shields.io/badge/React_Bootstrap-563D7C?style=for-the-badge&logo=react-bootstrap&logoColor=white)
- **Routing**: ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
- **HTTP Client**: ![Axios](https://img.shields.io/badge/Axios-000000?style=for-the-badge&logo=axios&logoColor=white)
- **Icons**: ![React Icons](https://img.shields.io/badge/React_Icons-000000?style=for-the-badge&logo=react-icons&logoColor=white)

### Backend

- **Language**: ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
- **Framework**: ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
- **Database**: ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
- **ORM/ODM**: ![Mongoose](https://img.shields.io/badge/Mongoose-800000?style=for-the-badge&logo=mongoose&logoColor=white)
- **Authentication**: ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white), ![Bcrypt](https://img.shields.io/badge/Bcrypt-000000?style=for-the-badge&logo=bcrypt&logoColor=white)
- **Utilities**: ![CORS](https://img.shields.io/badge/CORS-000000?style=for-the-badge&logo=cors&logoColor=white), ![Dotenv](https://img.shields.io/badge/Dotenv-000000?style=for-the-badge&logo=dotenv&logoColor=white)

## Project Structure

```
.
├── BackEnd/
│   ├── Controllers/
│   │   ├── adminController.js
│   │   ├── courseController.js
│   │   ├── enrollmentController.js
│   │   └── userController.js
│   ├── Models/
│   │   ├── courseModel.js
│   │   ├── enrollmentModel.js
│   │   └── userModel.js
│   ├── Routes/
│   │   ├── adminRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── studentRoutes.js
│   │   └── userRoutes.js
│   ├── config/
│   │   └── connectDB.js
│   ├── middlewares/
│   │   ├── Auth.MiddleWare.js
│   │   └── requestLogger.js
│   ├── package.json
│   └── server.js
└── FrontEnd/
    ├── eslint.config.js
    ├── package.json
    ├── src/
    │   ├── App.jsx
    │   ├── Components/
    │   │   ├── FooterCom.jsx
    │   │   ├── NavBar.jsx
    │   │   ├── SingleCourse.jsx
    │   │   └── UserCard.jsx
    │   ├── Pages/
    │   │   ├── AboutUs.jsx
    │   │   ├── AdminDashBoard.jsx
    │   │   ├── CourseDetail.jsx
    │   │   ├── CourseListing.jsx
    │   │   ├── Home.jsx
    │   │   ├── InstructorDashBoard.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── Register.jsx
    │   │   ├── StudentDashboard.jsx
    │   │   └── UploadLesson.jsx
    │   ├── Store/
    │   │   ├── CourseStore.jsx
    │   │   └── UserStore.jsx
    │   ├── Utils/
    │   │   ├── BackEnd_URI.js
    │   │   └── HandleUserAuth.js
    │   ├── index.css
    │   └── main.jsx
    └── vite.config.js
```

## Key Features

* **User Authentication**: Secure user registration and login with JWT-based authentication.
* **Role-Based Access Control**: Differentiated access for students, instructors, and administrators.
* **User Management**:
  * Admin can view all users, retrieve single user details, update user roles, and delete users.
  * Students can view their enrolled courses and track progress.
  * Instructors can manage courses they created.
* **Course Management**:
  * Instructors and Admins can create new courses with title, description, category, price, and lessons.
  * Users can view all available courses and individual course details.
  * Admins can view, update, and delete any course.
  * Instructors can view, update, and delete their own courses.
* **Lesson Management**: Instructors can add lessons (title, video URL, duration) to their courses.
* **Course Enrollment**: Students can enroll in courses.
* **Progress Tracking**: Students can mark individual lessons as complete within an enrolled course, with progress automatically calculated.
* **Database Integration**: Persistent storage using MongoDB with Mongoose ODM.
* **RESTful API**: A well-structured backend API to support all frontend operations.
* **Responsive User Interface**: Built with React and Tailwind CSS for a seamless experience across devices.

## API Endpoints

### User Authentication

| HTTP Method | Route                    | Request Data                  | Response                                                    | Description                                        |
| :---------- | :----------------------- | :---------------------------- | :---------------------------------------------------------- | :------------------------------------------------- |
| `POST`    | `/api/auth/login`      | `{ email, password }`       | `{ success, message, data: { _id, name, email }, token }` | Authenticates a user and returns a JWT.            |
| `POST`    | `/api/auth/register`   | `{ name, email, password }` | `{ success, message, data: { _id, name, email }, token }` | Registers a new user.                              |
| `GET`     | `/api/auth/loged-user` | _(Auth header required)_    | `{ success, message, data: { _id, name, email, role } }`  | Retrieves details of the currently logged-in user. |

### Course Management

| HTTP Method | Route                              | Request Data                                          | Response                                 | Description                                                      |
| :---------- | :--------------------------------- | :---------------------------------------------------- | :--------------------------------------- | :--------------------------------------------------------------- |
| `GET`     | `/api/course/all`                | _(None)_                                            | `{ success, message, data: [Course] }` | Retrieves all available courses.                                 |
| `GET`     | `/api/course/instructor-courses` | _(Auth header required)_                            | `{ success, message, data: [Course] }` | Retrieves courses created by the authenticated instructor.       |
| `GET`     | `/api/course/:id`                | _(None)_                                            | `{ success, message, data: Course }`   | Retrieves a single course by ID.                                 |
| `POST`    | `/api/course/create`             | `{ title, description, category, price }`           | `{ success, message, data: Course }`   | Creates a new course (Instructor/Admin only).                    |
| `PUT`     | `/api/course/:id`                | `{ title, description, category, price }` (partial) | `{ success, message, data: Course }`   | Updates an existing course (Instructor/Admin only).              |
| `DELETE`  | `/api/course/:id`                | _(None)_                                            | `{ success, message }`                 | Deletes a course (Instructor/Admin only).                        |
| `POST`    | `/api/course/:courseId/lesson`   | `{ title, videoUrl, duration }`                     | `{ success, message, data: Course }`   | Adds a new lesson to a specified course (Instructor/Admin only). |

### Student Enrollment

| HTTP Method | Route                                          | Request Data               | Response                                   | Description                                                     |
| :---------- | :--------------------------------------------- | :------------------------- | :----------------------------------------- | :-------------------------------------------------------------- |
| `POST`    | `/api/student/enroll`                        | `{ courseId }`           | `{ success, message, data: Enrollment }` | Enrolls the authenticated student in a course.                  |
| `GET`     | `/api/student/my-courses`                    | _(Auth header required)_ | `{ success, count, data: [Enrollment] }` | Retrieves all courses the authenticated student is enrolled in. |
| `PUT`     | `/api/student/lesson-complete/:enrollmentId` | `{ lessonId }`           | `{ success, message, data: Enrollment }` | Marks a specific lesson as complete for an enrollment.          |

### Admin Management

| HTTP Method | Route                      | Request Data                                          | Response                                      | Description                                              |
| :---------- | :------------------------- | :---------------------------------------------------- | :-------------------------------------------- | :------------------------------------------------------- |
| `GET`     | `/api/admin/analytics`   | _(Auth header required)_                            | `{ success, message, data: AnalyticsData }` | Retrieves general analytics data (Admin only).           |
| `GET`     | `/api/admin/users`       | _(Auth header required)_                            | `{ success, message, count, data: [User] }` | Retrieves all registered users (Admin only).             |
| `GET`     | `/api/admin/users/:id`   | _(Auth header required)_                            | `{ success, message, data: User }`          | Retrieves a single user by ID (Admin only).              |
| `PUT`     | `/api/admin/users/:id`   | `{ role }`                                          | `{ success, message, data: User }`          | Updates a user's role (Admin only).                      |
| `DELETE`  | `/api/admin/users/:id`   | _(None)_                                            | `{ success, message }`                      | Deletes a user (Admin only).                             |
| `GET`     | `/api/admin/courses`     | _(Auth header required)_                            | `{ success, message, data: [Course] }`      | Retrieves all courses for admin management (Admin only). |
| `PUT`     | `/api/admin/courses/:id` | `{ title, description, category, price }` (partial) | `{ success, message, data: Course }`        | Updates an existing course (Admin only).                 |
| `DELETE`  | `/api/admin/courses/:id` | _(None)_                                            | `{ success, message }`                      | Deletes a course (Admin only).                           |

## Setup Instructions

Follow these instructions to set up and run the project locally.

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```
2. **Install Backend Dependencies**:

   ```bash
   cd BackEnd
   npm install
   ```
3. **Install Frontend Dependencies**:

   ```bash
   cd ../FrontEnd
   npm install
   ```

### Environment Variables

Create a `.env` file in the `BackEnd` directory and populate it with the following variables:

```
PORT=8000
MONGODB_URI=mongodb://localhost:27017/LMS
JWT_SECRET=your_jwt_secret_key
```

### Run the Project

1. **Start the Backend Server**:
   Open a terminal, navigate to the `BackEnd` directory, and run:

   ```bash
   npm start
   ```
   The backend server will run on `http://localhost:8000` (or your specified `PORT`).
2. **Start the Frontend Development Server**:
   Open another terminal, navigate to the `FrontEnd` directory, and run:

   ```bash
   npm run dev
   ```
   The frontend application will typically open in your browser at `http://localhost:5173` (or another port as indicated by Vite).
