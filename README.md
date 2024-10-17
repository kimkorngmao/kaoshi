# Kaoshi - Exam Management System

## Introduction
**Kaoshi** is a simple web-based platform designed to facilitate exam management for both teachers and students. It allows teachers to create, manage, and grade exams, while students can register, attempt exams, and view their grades.

This project is powered by **NestJS** for the backend and **React** for the frontend.

## Features
### For Teachers:
- Create, edit, and delete exams and questions.
- Enroll students in specific exams.
- Grade student submissions and provide feedback.
- View and manage student grades and performance.

### For Students:
- Register and log in to access the system.
- View available exams and attempt them.
- Submit answers and receive scores and feedback from teachers.
- View grades and exam results.

## Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **MySQL** (or any other database supported by TypeORM)

## Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/kimkorngmao/kaoshi.git
cd kaoshi
```

### 2. Backend Setup (NestJS)
1. Install backend dependencies:
   ```bash
   npm install
   ```

2. Run the backend in development mode:
   ```bash
   npm run start:dev
   ```

The backend will run at `http://localhost:3000` (default NestJS port).

### 3. Frontend Setup (React)
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend folder and add the following:
   ```plaintext
   VITE_API_URL=http://127.0.0.1:3000
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

The frontend will be accessible at `http://localhost:5173` (or another port, depending on your Vite configuration).

## Technologies Used
- **Backend**: NestJS, TypeORM, MySQL, Passport (JWT-based authentication)
- **Frontend**: React, Vite, Tailwind CSS
- **Testing**: Jest (unit tests), Supertest (e2e testing)
- **Build Tools**: Vite (for frontend), ESLint, Prettier

## Database
This project uses **MySQL** as the primary database.

To apply the database schema, ensure that **TypeORM** is properly configured in the `app.module.ts` file and that migrations or synchronizations are properly set up to initialize the database tables.