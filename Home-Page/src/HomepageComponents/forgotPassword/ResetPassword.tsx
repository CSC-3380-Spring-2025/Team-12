import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword = () => {
    const { uidb64, token } = useParams<{ uidb64: string; token: string }>();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8000/auth/reset-password/${uidb64}/${token}/`, 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ 
                        new_password: newPassword,
                        confirm_password: confirmPassword 
                    }),
                }
            );

            const data = await response.json();
            
            if (response.ok) {
                setSuccess(true);
                // Use the redirect_url from backend or default to home
                setTimeout(() => navigate(data.redirect_url || "/"), 1500);
            } else {
                setError(data.error || "Password reset failed");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-box">
                <h1>Reset Your Password</h1>
                {success ? (
                    <div className="success-message">
                        <p>Password reset successfully! Redirecting...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {error && <p className="error">{error}</p>}
                        <div className="input-group">
                            <label>New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                minLength={5}
                            />
                        </div>
                        <div className="input-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Reset Password</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;