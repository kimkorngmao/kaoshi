import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getExamDetails } from '../../services/api';
import AuthContext from '../../context/AuthContext';
import { NavBar } from '../../components/NavBar/NavBar';
import { StudentExamView } from '../../components/StudentExamView/StudentExamView';
import { TeacherExamView } from '../../components/TeacherExamView/TeacherExamView';

export const AttemptExam = () => {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const response = await getExamDetails(examId);
        setExam(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response.data.message || 'Failed to load the exam. Please try again.');
        setLoading(false);
      }
    };

    fetchExamDetails();
  }, [examId]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="mt-28 max-w-screen-lg mx-auto px-4">

        {error ? 
        <>
        <div className="text-sm text-center text-red-500">{error}</div>
        {/* <Link to='/student-grades' className="block text-sm text-center text-blue-500">View your result here</Link> */}
        </> :
          currentUser.role === 'student' ? (
            <StudentExamView exam={exam.exam} submittedAnswers={exam.submittedAnswers} />
          ) : (
            <TeacherExamView exam={exam} />
          )
        }
      </div>
    </>
  );
};
