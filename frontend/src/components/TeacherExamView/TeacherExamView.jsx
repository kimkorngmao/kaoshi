import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteExam, deleteQuestion, removeEnrolledStudent } from '../../services/api'; // Import removeEnrolledStudent

export const TeacherExamView = ({ exam }) => {
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [questions, setQuestions] = useState(exam.questions); // Set initial questions from exam
  const navigate = useNavigate();

  const handleDeleteExam = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this exam?');
    if (confirmDelete) {
      try {
        await DeleteExam(exam.id);
        alert('Exam deleted successfully');
        navigate('/dashboard');
      } catch (error) {
        console.error('Error deleting exam:', error);
        alert('Failed to delete exam. Please try again.');
      }
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this question?');
    if (confirmDelete) {
      try {
        await deleteQuestion(questionId); // Delete question from API
        setQuestions(questions.filter((question) => question.id !== questionId)); // Update state to remove question
        alert('Question deleted successfully');
      } catch (error) {
        console.error('Error deleting question:', error);
        alert('Failed to delete question. Please try again.');
      }
    }
  };

  // Toggle selection of enrolled students
  const toggleStudentSelection = (studentId) => {
    setSelectedStudentIds((prevSelected) =>
      prevSelected.includes(studentId)
        ? prevSelected.filter((id) => id !== studentId) // Deselect
        : [...prevSelected, studentId] // Select
    );
  };

  // Remove selected students from the exam
  const handleRemoveStudents = async () => {
    if (selectedStudentIds.length === 0) {
      alert('Please select at least one student to remove.');
      return;
    }
    try {
      // Remove each selected student using the API
      await Promise.all(
        selectedStudentIds.map((studentId) =>
          removeEnrolledStudent(exam.id, studentId)
        )
      );

      // Remove the students from the UI by filtering them out
      exam.enrolledStudents = exam.enrolledStudents.filter(
        (student) => !selectedStudentIds.includes(student.id)
      );

      // Reset the selected student IDs
      setSelectedStudentIds([]);

      alert('Selected students removed successfully');
    } catch (error) {
      console.error('Error removing students:', error);
      alert('Failed to remove students. Please try again.');
    }
  };

  return (
    <>
      <div className="mt-28 max-w-screen-lg mx-auto">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-2xl text-gray-600">{exam.title}</h2>
            <div className="flex gap-4">
              <Link to={`/exams/${exam.id}/edit`} className="text-sm text-blue-500 hover:text-blue-700">
                Edit
              </Link>
              <button onClick={handleDeleteExam} className="text-sm text-red-500 hover:text-red-700">
                Delete
              </button>
            </div>
          </div>

          <p className="text-gray-500 mb-6">{exam.description}</p>

          {/* Exam Details Section */}
          <div className="grid gap-4 gap-y-8 text-sm grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <h3 className="font-medium text-lg text-gray-700 mb-2">Exam Details</h3>
              <p className="text-gray-500">
                <strong>Start:</strong> {new Date(exam.startTime).toLocaleString()} <br />
                <strong>End:</strong> {new Date(exam.endTime).toLocaleString()}
              </p>
            </div>

            {/* Questions Section */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-medium mb-4">Questions:</h3>
              {questions.length === 0 ? (
                <p className="text-gray-500">There are no questions yet.</p>
              ) : (
                <ol type="1" className="list-decimal ml-6 mb-6">
                  {questions.map((question) => (
                    <li key={question.id} className="mb-4">
                      <div className="flex justify-between items-baseline">
                        <div>
                          <strong>{question.text}</strong> ({question.type})
                          {question.type === 'multiple-choice' && (
                            <ol style={{ listStyleType: 'upper-alpha' }} className="ml-4 list-inside">
                              {question.options.map((option, index) => (
                                <li key={index}>{option}</li>
                              ))}
                            </ol>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/${exam.id}/questions/${question.id}/edit`)}
                            className="text-blue-500 hover:text-blue-700 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteQuestion(question.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            {/* Enrolled Students Section */}
            <div className="lg:col-span-2">
              <h3 className="text-lg text-gray-600 font-medium mb-4">Enrolled Students:</h3>
              {exam.enrolledStudents.length === 0 ? (
                <p className="text-gray-500">There are no enrolled students yet.</p>
              ) : (
                <form>
                  <ul className="max-h-48 overflow-y-auto bg-gray-50 border rounded p-2">
                    {exam.enrolledStudents.map((student) => (
                      <li
                        key={student.id}
                        onClick={() => toggleStudentSelection(student.id)}
                        className={`p-2 flex items-center rounded-md mb-2 ${
                          selectedStudentIds.includes(student.id) ? 'bg-blue-100' : 'hover:bg-gray-200'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedStudentIds.includes(student.id)}
                          className="mr-2"
                        />
                        <span>{student.username} (ID: {student.id})</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={handleRemoveStudents}
                    className="mt-4 bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
                  >
                    Remove Selected Students
                  </button>
                </form>
              )}
            </div>

            {/* Actions Section */}
            <div className="lg:col-span-2 mt-8 flex flex-wrap gap-4">
              <Link
                to={`/exams/${exam.id}/add-question`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-200"
              >
                Add Question
              </Link>
              <Link
                to={`/exams/${exam.id}/grading`}
                className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition duration-200"
              >
                Grading
              </Link>
              <Link
                to={`/exams/${exam.id}/enroll`}
                className="bg-purple-500 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition duration-200"
              >
                Enroll Students
              </Link>
              <Link
                to={`/exams/${exam.id}/results`}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded transition duration-200"
              >
                View Results
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
