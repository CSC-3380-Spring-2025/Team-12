import React from 'react';
import UserProfileComponent from './UserProfileComponent';
import {FaUser} from "react-icons/fa";

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="left">
                {/* Other header content, e.g., logo, navigation */}
            </div>
            <div className="right">
                <UserProfileComponent />  {/* Display the logged-in user's profile */}
            </div>
        </header>
    );
};

export default Header;
