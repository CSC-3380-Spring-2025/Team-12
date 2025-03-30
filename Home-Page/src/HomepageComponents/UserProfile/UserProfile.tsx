import React, { useEffect, useState } from 'react';
import { UserProfileProps } from './types';
import "./UserProfile.css";


const UserProfileComponent: React.FC = () => {
    const [user, setUser] = useState<UserProfileProps | null>(null);

    useEffect(() => {
        // Fetch user profile data from Django backend
        fetch('http://localhost:8000/get_user_profile/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Use token if needed for authentication
            },
        })
        .then((response) => response.json())
        .then((data: UserProfileProps) => {
            setUser(data);
        })
        .catch((error) => {
            console.error('Error fetching user profile:', error);
        });
    }, []);

    if (!user) {
        return <span>Loading...</span>;  // You can also display a spinner or nothing while loading
    }

    return (
        <div className="user-profile">
            <span>{user.username}</span>
        </div>
    );
};

export default UserProfileComponent;
