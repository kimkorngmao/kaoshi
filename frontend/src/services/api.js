import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/user/register`, userData);
};

export const loginUser = async (loginData) => {
  return await axios.post(`${API_URL}/auth/login`, loginData);
};

// Fetch exams available for students
export const getAvailableExams = async () => {
  return await axios.get(`${API_URL}/exams/available`, getAuthHeaders());
};

// Delete an exam
export const DeleteExam = async (id) => {
  return await axios.delete(`${API_URL}/exams/${id}`, getAuthHeaders());
};

// Update an exam
export const UpdateExam = async (id, updatedData) => {
  return await axios.patch(`${API_URL}/exams/${id}`, updatedData, getAuthHeaders()); // Pass the updated data
};

// Fetch exams created by teachers
export const getTeacherExams = async () => {
  return await axios.get(`${API_URL}/exams/teacher`, getAuthHeaders());
};

// Fetch user profile (to check role)
export const getUserProfile = async () => {
  return await axios.get(`${API_URL}/user/me`, getAuthHeaders());
};

// Fetch exam details for teacher by exam ID
export const getExamDetails = async (examId) => {
  return await axios.get(`${API_URL}/exams/${examId}`, getAuthHeaders());
};

// Create a new exam (teacher only)
export const createExam = async (examData) => {
  return await axios.post(`${API_URL}/exams/create`, examData, getAuthHeaders());
};

// Fetch question details
export const getQuestionDetails = async (questionId) => {
  return await axios.get(`${API_URL}/exam-forms/questions/${questionId}`, getAuthHeaders());
};

// Add a question to an exam
export const addQuestionToExam = async (examId, questionData) => {
  return await axios.post(`${API_URL}/exam-forms/exam/${examId}/question`, questionData, getAuthHeaders());
};

// Update a question
export const updateQuestion = async (questionId, updatedData) => {
  return await axios.patch(`${API_URL}/exam-forms/question/${questionId}`, updatedData, getAuthHeaders());
};

// Delete a question from an exam
export const deleteQuestion = async (questionId) => {
  return await axios.delete(`${API_URL}/exam-forms/question/${questionId}`, getAuthHeaders());
};


// Submit an answer to a question
export const submitAnswer = async (answerData) => {
  return await axios.post(`${API_URL}/exam-forms/question/${answerData.questionId}/submit`, answerData, getAuthHeaders());
};

// Fetch submitted answers for an exam (teacher only)
export const getExamResults = async (examId) => {
  return await axios.get(`${API_URL}/exam-forms/exam/${examId}/results`, getAuthHeaders());
};

// Grade a student's answer
export const gradeAnswer = async (answerId, gradeData) => {
  return await axios.patch(`${API_URL}/exam-forms/answer/${answerId}/grade`, gradeData, getAuthHeaders());
};

// Fetch student final grades for all exams
export const getStudentGrades = async () => {
  return await axios.get(`${API_URL}/exams/student-grades`, getAuthHeaders());
};

// Enroll a student in an exam
export const enrollStudent = async (examId, studentId) => {
  return await axios.post(`${API_URL}/exams/${examId}/enroll`, { studentId }, getAuthHeaders());
};

export const removeEnrolledStudent = async (examId, studentId) => {
  return await axios.delete(`${API_URL}/exams/${examId}/students/${studentId}`, getAuthHeaders());
};

// Get all user
export const getAllUsers = async () => {
  return await axios.get(`${API_URL}/user`, getAuthHeaders()); // Assuming /user returns all users
};