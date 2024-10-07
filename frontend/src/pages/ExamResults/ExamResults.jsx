import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getExamResults } from '../../services/api';
import { NavBar } from '../../components/NavBar/NavBar';

const ExamResults = () => {
  const { examId } = useParams();
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <>
      <NavBar />
      <div>
        <div className="mt-28 max-w-screen-lg mx-auto px-4">
          <div>
            <h2 className="font-semibold text-xl text-gray-600">Exam Results</h2>
            <p className="text-gray-500 mb-6">Below are the total grades for each student.</p>

            <div>
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-sm py-2 px-4 border-b text-left text-gray-600">Student Name</th>
                    <th className="text-sm py-2 px-4 border-b text-left text-gray-600">Total Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(results).map((studentId) => {
                    const student = results[studentId].student;
                    const totalGrade = results[studentId].totalGrade;

                    return (
                      <tr key={studentId} className="border-b hover:bg-gray-100">
                        <td className="text-sm py-2 px-4 text-gray-700">{student.username}</td>
                        <td className="text-sm py-2 px-4 text-gray-700">{totalGrade}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamResults;
