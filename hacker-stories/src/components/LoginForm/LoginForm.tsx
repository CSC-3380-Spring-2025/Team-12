import React from "react";
import './loginForm.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

interface LoginFormProps {
    isOpen: boolean;
    onClose: () => void;
  }
  const LoginForm: React.FC<LoginFormProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // Don't render if isOpen is false
    return (
        <div className="modal-overlay">
        <div className="wrapper">
            <span className="close-x" onClick={onClose}>&times;</span>
            <form action="">
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" required/>
                     <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required/>
                    <FaLock className="icon"/>
                </div>

                <div className="remember-forgot">
                    <label><input type="checkbox" />Remember me</label>
                    <a href="#">Forgot password</a>
                </div>
                <button type="submit">Login</button>
            </form> 
        </div>
        </div>
    )
}
export default LoginForm;    