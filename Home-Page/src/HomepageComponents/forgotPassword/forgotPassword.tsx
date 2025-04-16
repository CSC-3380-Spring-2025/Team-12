import React, { useState } from "react";
import "../LoginForm/loginForm.css";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface ForgotPasswordProps {
    isOpen: boolean;
    onClose: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        try {
            const response = await fetch("http://127.0.0.1:8000/auth/forgot-password/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                // Close the modal and navigate to reset page
                onClose();
                navigate(`/reset-password/${data.uidb64}/${data.token}/`);
            } else {
                setError(data.error || "Failed to initiate password reset");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="wrapper">
                <span className="close-x" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <h1>Forgot Password</h1>
                    {error && <p className="error">{error}</p>}
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
                    <button type="submit">Continue to Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;