import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { submitAnswer } from '../../services/api';

export const StudentExamView = ({ exam, submittedAnswers }) => {
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize answers with submitted ones or empty if not submitted
    const initialAnswers = exam.questions.reduce((acc, question) => {
      // Match question with the corresponding submitted answer
      const submittedAnswer = submittedAnswers.find(ans => ans.questionId === question.id);
      acc[question.id] = submittedAnswer ? submittedAnswer.answer : ''; // Use submitted answer if available
      return acc;
    }, {});
    setAnswers(initialAnswers);
  }, [exam, submittedAnswers]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const questionId in answers) {
        if (answers[questionId].trim()) {
          await submitAnswer({
            questionId: parseInt(questionId),
            answer: answers[questionId],
          });
        }
      }
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to submit answers. Please try again.');
    }
  };

  return (
    <>
      <div className="max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">{exam.title}</h2>
          <p className="text-gray-500 mb-6">{exam.description}</p>

          <div>
            <form onSubmit={handleSubmit}>
              {exam.questions.map((question) => (
                <div key={question.id} className="mb-6">
                  <h3 className="text-lg font-bold mb-2">{question.text}</h3>

                  {question.type === 'multiple-choice' ? (
                    <div>
                      {question.options.map((option, index) => (
                        <div key={index} className="mb-2">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={option}
                              checked={answers[question.id] === option}
                              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                              className="form-radio"
                            />
                            <span className="ml-2">{option}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <textarea
                      className="w-full p-2 mt-2 border rounded-md bg-gray-50"
                      rows="4"
                      value={answers[question.id]}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    />
                  )}
                </div>
              ))}

              {error && <p className="text-red-500 mb-4">{error}</p>}

              <div className="md:col-span-5 text-right">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Submit Answers
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
