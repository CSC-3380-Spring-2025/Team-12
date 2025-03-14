import React, { useState } from "react";
import "./loginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import ForgotPassword from "../forgotPassword/forgotPassword";

interface LoginFormProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ isOpen, onClose }) => {
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="wrapper">
                <span className="close-x" onClick={onClose}>&times;</span>
                <form action="">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required />
                        <FaLock className="icon" />
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" />Remember me</label>
                        <a href="#" onClick={() => setIsForgotPasswordOpen(true)}>Forgot password?</a>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
            <ForgotPassword isOpen={isForgotPasswordOpen} onClose={() => setIsForgotPasswordOpen(false)} />
        </div>
    );
};

export default LoginForm;
