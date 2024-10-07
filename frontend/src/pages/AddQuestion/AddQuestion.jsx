import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addQuestionToExam } from '../../services/api';
import { NavBar } from '../../components/NavBar/NavBar';
import AuthContext from '../../context/AuthContext';

export const AddQuestion = () => {
  const { examId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [questionData, setQuestionData] = useState({
    text: '',
    type: 'text',
    options: [],
  });
  const [optionInput, setOptionInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setQuestionData({
      ...questionData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle adding a new option
  const handleAddOption = () => {
    if (optionInput.trim()) {
      setQuestionData({
        ...questionData,
        options: [...questionData.options, optionInput],
      });
      setOptionInput(''); // Clear the input
    }
  };

  // Handle removing an option
  const handleRemoveOption = (index) => {
    setQuestionData({
      ...questionData,
      options: questionData.options.filter((_, i) => i !== index), // Remove option by index
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure options are only added for multiple-choice questions
      if (questionData.type === 'multiple-choice' && questionData.options.length === 0) {
        setError('Please add at least one option for the multiple-choice question.');
        return;
      }

      // Add the question to the exam
      await addQuestionToExam(examId, questionData);

      // Navigate back to the exam details page after the question is added
      navigate(`/exams/${examId}/attempt`);
    } catch (err) {
      setError('Failed to add question. Please try again.');
    }
  };

  // Handle cases where students should not access this page
  if (currentUser && currentUser.role === 'student') {
    return (
      <>
        <NavBar />
        <div className="max-w-screen-lg mx-auto mt-28 px-4">
          <p className="text-sm text-red-400 text-center">No permission.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="max-w-screen-lg mx-auto mt-28 px-4">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">Add Question to Exam</h2>
          <p className="text-gray-500 mb-6">Add a new question to your exam.</p>

          <div className="mt-8">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Question Details</p>
                <p>Please fill out all the fields below.</p>
              </div>

              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    {/* Question Text */}
                    <div className="md:col-span-5">
                      <label htmlFor="text" className="block text-gray-700">Question Text</label>
                      <input
                        type="text"
                        name="text"
                        id="text"
                        value={questionData.text}
                        onChange={handleChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        required
                      />
                    </div>

                    {/* Question Type */}
                    <div className="md:col-span-5">
                      <label htmlFor="type" className="block text-gray-700">Question Type</label>
                      <select
                        name="type"
                        id="type"
                        value={questionData.type}
                        onChange={handleChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      >
                        <option value="text">Text</option>
                        <option value="multiple-choice">Multiple Choice</option>
                      </select>
                    </div>

                    {/* Multiple Choice Options */}
                    {questionData.type === 'multiple-choice' && (
                      <>
                        <div className="md:col-span-5">
                          <label htmlFor="options" className="block text-gray-700">Add Options</label>
                          <div className="flex items-center">
                            <input
                              type="text"
                              value={optionInput}
                              onChange={(e) => setOptionInput(e.target.value)}
                              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            />
                            <button
                              type="button"
                              onClick={handleAddOption}
                              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                              Add
                            </button>
                          </div>
                        </div>

                        {/* Display added options with the ability to remove */}
                        <div className="md:col-span-5">
                          <ol style={{ listStyleType: 'upper-alpha' }} className="mt-2 list-inside">
                            {questionData.options.map((option, index) => (
                              <li key={index} className="text-gray-700">
                                <div className="inline-flex items-center">
                                  <span>{option}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveOption(index)}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </>
                    )}

                    {/* Error Message */}
                    {error && (
                      <div className="md:col-span-5">
                        <p className="text-red-500">{error}</p>
                      </div>
                    )}

                    <div className="md:col-span-5 text-right mt-5">
                      <div className="inline-flex items-end">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Add Question
                        </button>

                        <button
                          type="button"
                          className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => navigate(`/exams/${examId}/attempt`)}
                        >
                          Back to Exam
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
