import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getExamResults, gradeAnswer } from '../../services/api';
import { NavBar } from '../../components/NavBar/NavBar';

export const ExamGrading = () => {
  const { examId } = useParams();
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [grading, setGrading] = useState({}); // Store grades for all students

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await getExamResults(examId);
        setResults(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load exam results.');
        setLoading(false);
      }
    };

    fetchResults();
  }, [examId]);

  // Handle grade input change for a specific answer of a student
  const handleGradeChange = (studentId, answerId, value) => {
    setGrading((prevGrading) => ({
      ...prevGrading,
      [studentId]: {
        ...prevGrading[studentId],
        [answerId]: value,
      },
    }));
  };

  // Handle submit grades for a specific student
  const handleSubmitGradesForStudent = async (studentId) => {
    const studentGrades = grading[studentId];

    // Validate all grades before submission
    const invalidGrade = Object.values(studentGrades).some(
      (grade) => grade < 0 || grade > 100
    );
    if (invalidGrade) {
      setError('All grades must be between 0 and 100.');
      return;
    }

    // Submit each answer's grade for the student
    try {
      await Promise.all(
        Object.entries(studentGrades).map(([answerId, grade]) =>
          gradeAnswer(answerId, { grade: parseInt(grade) })
        )
      );
      alert('Grades submitted successfully.');
      // Optionally reload results after submission
      const response = await getExamResults(examId);
      setResults(response.data);
    } catch (err) {
      setError('Failed to submit grades.');
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <>
      <NavBar />
      <div className="mt-28 max-w-screen-lg mx-auto px-4">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">Exam Results</h2>
          <p className="text-gray-500 mb-6">Grade student answers below:</p>

          <div>
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Student Submissions</p>
                <p>Review and grade the student answers for this exam.</p>
              </div>

              <div className="lg:col-span-2">
                {Object.keys(results).length === 0 && (
                  <div className="text-gray-400">No submissions yet.</div>
                )}
                {Object.keys(results).map((studentId) => {
                  const student = results[studentId].student;
                  const studentAnswers = results[studentId].answers;

                  return (
                    <div key={studentId} className="mb-8 bg-slate-50 p-4 rounded-md shadow-sm">
                      <h3 className="text-lg font-medium mb-4">
                        {student.username}
                      </h3>
                      <ol className="list-decimal ml-5 mb-6">
                        {studentAnswers.map((answer) => (
                          <li key={answer.question} className="mb-2">
                            <p className="mb-1">
                              <strong>{answer.question}</strong>
                            </p>
                            <div className="flex items-center space-x-4">
                              <input
                                type="number"
                                min="0"
                                max="100"
                                className="p-2 mt-2 border rounded-md w-20 bg-white"
                                value={
                                  (grading[studentId] && grading[studentId][answer.id]) || answer.grade || ''
                                }
                                onChange={(e) =>
                                  handleGradeChange(studentId, answer.id, e.target.value)
                                }
                              />
                              <p>{answer.answer}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                      <p className='mb-5 text-blue-600'>Total: {results[studentId].totalGrade}</p>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                        onClick={() => handleSubmitGradesForStudent(studentId)}
                      >
                        Submit Grades for {student.username}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
