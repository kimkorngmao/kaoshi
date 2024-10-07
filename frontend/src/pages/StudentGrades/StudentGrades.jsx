import React, { useState, useEffect } from 'react';
import { getStudentGrades } from '../../services/api';
import { NavBar } from '../../components/NavBar/NavBar';

export const StudentGrades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await getStudentGrades();
        setGrades(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load your grades.');
        setLoading(false);
      }
    };

    fetchGrades();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <>
      <NavBar/>
      <div className="mt-28 max-w-screen-lg mx-auto px-4">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">Your Grades</h2>
          <p className="text-gray-500 mb-6">View your exam results below.</p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Exams Completed</p>
                <p>Check the grades you've received for your exams.</p>
              </div>

              <div className="lg:col-span-2">
                {grades.length === 0 ? (
                  <p className="text-gray-700">You have not completed any exams yet.</p>
                ) : (
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 border-b text-left text-gray-600">Exam</th>
                        <th className="py-2 px-4 border-b text-left text-gray-600">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grades.map((grade) => (
                        <tr key={grade.examId} className="bg-white border-b hover:bg-gray-100">
                          <td className="py-2 px-4 text-gray-700">{grade.examTitle}</td>
                          <td className="py-2 px-4 text-gray-700">
                            {grade.finalGrade !== null ? grade.finalGrade : 'Pending'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
