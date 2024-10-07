import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext'; // Assuming you have an AuthContext providing user data
import { NavBar } from '../../components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
    const { currentUser, isAuthenticated } = useContext(AuthContext); // Get current user data from context
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (!isAuthenticated) return <p className='text-center text-red-400 text-sm'>No permission.</p>
    return (
        <>
            <NavBar />
            <div className="mt-28 max-w-screen-lg mx-auto px-4">
                <div>
                    <h2 className="text-xl font-medium mb-6">Your Profile</h2>

                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                        {/* Username (No Edit) */}
                        <div className="md:col-span-1">
                            <label className="block text-gray-700">Username</label>
                            <div className="mt-1 p-2 bg-gray-50 border rounded-md">{currentUser.username}</div>
                        </div>

                        {/* Email (No Edit) */}
                        <div className="md:col-span-1">
                            <label className="block text-gray-700">Email</label>
                            <div className="mt-1 p-2 bg-gray-50 border rounded-md">{currentUser.email}</div>
                        </div>

                        {/* Role (No Edit) */}
                        <div className="md:col-span-1">
                            <label className="block text-gray-700">Role</label>
                            <div className="mt-1 p-2 bg-gray-50 border rounded-md capitalize">{currentUser.role}</div>
                        </div>

                        {/* Joined Date (created_at) */}
                        <div className="md:col-span-1">
                            <label className="block text-gray-700">Joined Date</label>
                            <div className="mt-1 p-2 bg-gray-50 border rounded-md">
                                {new Date(currentUser.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </div>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="mt-5 text-sm px-4 py-2 rounded-md btn-sm bg-red-500 text-gray-200 shadow hover:bg-red-600">
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};
