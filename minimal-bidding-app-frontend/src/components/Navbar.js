import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
    // Example logic to check if user is logged in
    const isLoggedIn = localStorage.getItem('token') != null;

    const handleLogout = async () => {
        try {
            // Optionally call backend logout endpoint
            await axios.post('/api/logout', { token: localStorage.getItem('token') });
        } catch (error) {
            console.error('Logout failed', error);
        }
        localStorage.removeItem('token');
        // Update application state or redirect as needed
    };
    return (
        <nav className="bg-gray-800 p-4 text-white flex justify-between">
            <div>
                <Link to="/" className="mr-4">Home</Link>
                {!isLoggedIn && <Link to="/login">Login</Link>}
                {isLoggedIn && <Link to="/profile">Profile</Link>}
            </div>
            {isLoggedIn && <button onClick={handleLogout} className="bg-red-500 py-2 px-4 rounded">Logout</button>}
        </nav>
    );
}

export default Navbar;
