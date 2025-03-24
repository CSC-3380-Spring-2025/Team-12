import React, { useState } from "react";
import "./loginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import ForgotPassword from "../forgotPassword/forgotPassword";

interface LoginFormProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8000/auth/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Login successful!");
                onClose(); // Close the modal
            } else {
                setError(data.error || "Login failed");
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
                    <h1>Login</h1>
                    {error && <p className="error">{error}</p>}
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
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