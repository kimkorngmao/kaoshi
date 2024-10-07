import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { enrollStudent, getAllUsers } from '../../services/api';
import { NavBar } from '../../components/NavBar/NavBar';
import AuthContext from '../../context/AuthContext';

export const EnrollStudent = () => {
  const { examId } = useParams();
  const { currentUser } = useContext(AuthContext)
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Fetch all students when the component loads
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getAllUsers();
        const studentList = response.data.filter((student) => student.role === 'student');
        setStudents(studentList);
        setFilteredStudents(studentList); // Initially show all students
      } catch (err) {
        setError('Failed to load students.');
      }
    };
    fetchStudents();
  }, []);

  // Filter students based on the search term
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredStudents(
      students.filter((student) =>
        student.username.toLowerCase().includes(term) || student.email.toLowerCase().includes(term)
      )
    );
  };

  // Handle student selection toggle
  const toggleStudentSelection = (studentId) => {
    setSelectedStudentIds((prevSelected) =>
      prevSelected.includes(studentId)
        ? prevSelected.filter((id) => id !== studentId) // Deselect if already selected
        : [...prevSelected, studentId] // Select if not selected
    );
  };

  // Handle submit for enrolling multiple students
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedStudentIds.length === 0) {
      setError('Please select at least one student to enroll.');
      return;
    }
    try {
      await Promise.all(selectedStudentIds.map((studentId) => enrollStudent(examId, studentId)));
      setSuccessMessage('Students enrolled successfully!');
      setError('');
      setSelectedStudentIds([]); // Clear selections after success
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to enroll the students. Please try again.');
      setSuccessMessage('');
    }
  };

  if(currentUser && currentUser.role === "student"){
    return(
      <>
      <NavBar/>
      <div className="max-w-screen-lg mx-auto mt-28 px-4">
        <p className="text-sm text-red-400 text-center">No permission.</p>
      </div>
      </>
    )
  }

  return (
    <>
      <NavBar/>
      <div className="mt-28 max-w-screen-lg mx-auto px-4">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">Enroll Students in Exam</h2>
          <p className="text-gray-500 mb-6">Enroll one or more students in the exam by selecting them from the list below.</p>

          <div className="mt-8">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Select Students</p>
                <p>Choose the students you wish to enroll.</p>
              </div>

              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    {/* Search */}
                    <div className="md:col-span-5">
                      <label className="block text-gray-700">Search Students</label>
                      <input
                        type="text"
                        placeholder="Search by name or email"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>

                    {/* List of Students */}
                    <div className="md:col-span-5">
                      <ul className="max-h-48 overflow-y-auto mb-4 bg-gray-50 border rounded p-2">
                        {filteredStudents.map((student) => (
                          <li
                            key={student.id}
                            className={`p-2 cursor-pointer flex items-center rounded-md mb-2 ${
                              selectedStudentIds.includes(student.id) ? 'bg-blue-100' : 'hover:bg-gray-200'
                            }`}
                            onClick={() => toggleStudentSelection(student.id)}
                          >
                            <input
                              type="checkbox"
                              checked={selectedStudentIds.includes(student.id)}
                              onChange={() => toggleStudentSelection(student.id)}
                              className="mr-2"
                            />
                            <span>
                              {student.username} ({student.email})
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Error or Success Message */}
                    <div className="md:col-span-5">
                      {error && <p className="text-red-500 mb-4">{error}</p>}
                      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                    </div>

                    {/* Submit and Back Buttons */}
                    <div className="md:col-span-5 text-right">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Enroll Selected Students
                      </button>

                      <button
                        className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => navigate(`/exams/${examId}/attempt`)}
                      >
                        Back to Exam
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
