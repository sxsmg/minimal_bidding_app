import React, { useState } from 'react';
import api from './axiosConfig'; // Adjust the path based on your file structure

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/signup', formData);
            console.log(response.data);
            // Handle signup success (e.g., redirect to login)
        } catch (error) {
            console.error('Signup error', error.response.data);
            // Handle signup error
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="border p-2 rounded w-full"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border p-2 rounded w-full"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="border p-2 rounded w-full"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
