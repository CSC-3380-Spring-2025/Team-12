import React from "react";
import "../LoginForm/loginForm.css";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

interface RegistrationFormProps {
    isOpen: boolean;
    onClose: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="wrapper">
                <span className="close-x" onClick={onClose}>&times;</span>
                <form action="">
                    <h1>Register</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="email" placeholder="Email" required />
                        <FaEnvelope className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required />
                        <FaLock className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Confirm Password" required />
                        <FaLock className="icon" />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
