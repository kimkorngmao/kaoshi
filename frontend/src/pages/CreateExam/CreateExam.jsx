import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createExam } from '../../services/api';
import { NavBar } from '../../components/NavBar/NavBar';
import AuthContext from '../../context/AuthContext';

export const CreateExam = () => {
  const { currentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create the new exam
      await createExam({
        ...formData,
        startTime: new Date(formData.startTime).toISOString(),
        endTime: new Date(formData.endTime).toISOString(),
      });

      // Navigate to the dashboard upon successful creation
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create the exam. Please try again.');
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
      <div className="max-w-screen-lg mx-auto mt-28 px-4">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">Create New Exam</h2>
          <p className="text-gray-500 mb-6">Fill in the details to create a new exam.</p>

          <div className="mt-8">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Exam Details</p>
                <p>Please fill out all fields below.</p>
              </div>

              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    {/* Title */}
                    <div className="md:col-span-5">
                      <label className="block text-gray-700">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        required
                      />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-5">
                      <label className="block text-gray-700">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="h-20 border mt-1 rounded px-4 w-full bg-gray-50"
                        required
                      />
                    </div>

                    {/* Start Time */}
                    <div className="md:col-span-5">
                      <label className="block text-gray-700">Start Time</label>
                      <input
                        type="datetime-local"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        required
                      />
                    </div>

                    {/* End Time */}
                    <div className="md:col-span-5">
                      <label className="block text-gray-700">End Time</label>
                      <input
                        type="datetime-local"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        required
                      />
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="md:col-span-5">
                        <p className="text-red-500">{error}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Create Exam
                        </button>
                      </div>
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
