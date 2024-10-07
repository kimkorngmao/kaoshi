import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAvailableExams, getTeacherExams, getUserProfile } from '../../services/api';
import { NavBar } from '../../components/NavBar/NavBar';

export const Dashboard = () => {
  const [exams, setExams] = useState([]);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        // Get the user's profile to check their role
        const profile = await getUserProfile();
        setRole(profile.data.role);

        // Fetch exams based on role
        if (profile.data.role === 'student') {
          const response = await getAvailableExams();
          setExams(response.data);
        } else if (profile.data.role === 'teacher') {
          const response = await getTeacherExams();
          setExams(response.data);
        }

        setLoading(false);
      } catch (err) {
        setError('Failed to load exams.');
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="mt-28 max-w-screen-lg mx-auto px-4">
        <h1 className="text-xl font-medium mb-6">
          {role === 'student' ? 'Available Exams' : 'Your Created Exams'}
          <Link to='/student-grades' className="block text-sm text-blue-500">View your result here</Link>
        </h1>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.length === 0 ? (
              <p className="col-span-3 text-center text-gray-500">No exams found</p>
            ) : (
              exams.map((exam) => (
                <div key={exam.id} className="rounded-lg bg-gray-50 shadow-md p-6 hover:shadow-lg transition duration-200">
                  <div className="p-2 w-fit h-fit rounded-lg bg-blue-100 text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13.5H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-medium mt-4">{exam.title}</h2>
                  <p className="text-gray-500 mb-2 text-sm">{exam.description}</p>
                  <div className="text-gray-500 text-xs mt-2">
                    {/* Start Time */}
                    <div className="flex items-center space-x-2 text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      <p>
                        {new Date(exam.startTime).toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })} -{' '}
                        {new Date(exam.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                      </p>
                    </div>

                    {/* End Time */}
                    <div className="mt-1 flex items-center space-x-2 text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      <p>
                        {new Date(exam.endTime).toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })} -{' '}
                        {new Date(exam.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                      </p>
                    </div>
                  </div>

                  <button
                    className="mt-4 w-full bg-blue-700 hover:bg-blue-800 duration-200 text-white text-sm font-medium py-2 rounded"
                    onClick={() => navigate(`/exams/${exam.id}/attempt`)}
                  >
                    {role === 'teacher' ? 'View Exam Details' : 'Attempt Quiz'}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};
