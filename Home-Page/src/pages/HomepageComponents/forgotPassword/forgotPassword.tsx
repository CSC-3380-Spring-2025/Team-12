import React, { useState } from "react";
import "../LoginForm/loginForm.css";
import { FaEnvelope } from "react-icons/fa";

interface ForgotPasswordProps {
    isOpen: boolean;
    onClose: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Password reset link sent to:", email);
        setSubmitted(true);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="wrapper">
                <span className="close-x" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <h1>Forgot Password</h1>
                    {submitted ? (
                        <p>A password reset link has been sent to your email.</p>
                    ) : (
                        <>
                            <div className="input-box">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                                <FaEnvelope className="icon" />
                            </div>
                            <button type="submit">Send Reset Link</button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
