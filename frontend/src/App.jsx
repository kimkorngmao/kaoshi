import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home/Home"
import { Login } from "./pages/Login/Login"
import { Dashboard } from "./pages/Dashboard/Dashboard"
import { Register } from "./pages/Register/Register"
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute"
import { CreateExam } from "./pages/CreateExam/CreateExam"
import { AddQuestion } from "./pages/AddQuestion/AddQuestion"
import { AttemptExam } from "./pages/AttemptExam/AttemptExam"
import { ExamGrading } from "./pages/ExamGrading/ExamGrading"
import { StudentGrades } from "./pages/StudentGrades/StudentGrades"
import { EnrollStudent } from "./pages/EnrollStudent/EnrollStudent"
import { Profile } from "./pages/Profile/Profile"
import ExamResults from "./pages/ExamResults/ExamResults"
import { EditExam } from "./pages/UpdateExam/UpdateExam"
import { EditQuestion } from "./pages/EditQuestion/EditQuestion"


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/exams/create" element={<PrivateRoute><CreateExam /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/student-grades" element={<PrivateRoute><StudentGrades /></PrivateRoute>}/>
        <Route path="/:examId/questions/:questionId/edit" element={<PrivateRoute><EditQuestion /></PrivateRoute>}/>
        <Route path="/exams/:examId/edit" element={<PrivateRoute><EditExam /></PrivateRoute>}/>
        <Route path="/exams/:examId/results" element={<PrivateRoute><ExamResults /></PrivateRoute>}/>
        <Route path="/exams/:examId/add-question" element={<PrivateRoute><AddQuestion /></PrivateRoute>}/>
        <Route path="/exams/:examId/attempt" element={<PrivateRoute><AttemptExam /></PrivateRoute>}/>
        <Route path="/exams/:examId/grading" element={<PrivateRoute><ExamGrading /></PrivateRoute>}/>
        <Route path="/exams/:examId/enroll" element={<PrivateRoute><EnrollStudent /></PrivateRoute>}/>
        
      </Routes>
    </div>
  )
}

export default App
