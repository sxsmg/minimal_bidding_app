import React, { useState, useEffect } from 'react';
import api from './axiosConfig'; // Adjust the path based on your file structure

function UserProfile() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log("TOKEN", token)
                const response = await api.post('/api/user/profile', {
                    headers: { Authorization: `${token}`, email: localStorage.getItem('user_email')}
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data', error);
                // Handle error, e.g., redirect to login if unauthorized
            }
        };

        fetchUserData();
    }, []);

    if (!userData) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">User Profile</h2>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            {/* Display other user data */}
        </div>
    );
}

export default UserProfile;
