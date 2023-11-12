import React, { useState } from "react";
import { RegisterUser } from "../../../api";

function Register({ onToggle }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleUserCreation = async (event) => {
        event.preventDefault();

        if (!name || !confirmPassword || !password || !email) {
            setError("All fields are required");
            return;
        } else if (password !== confirmPassword) {
            setError("Passwords do not match")
            return;
        } else if (password.length < 6) {
            setError("Password is too short")
            return;
        }

        try {
            RegisterUser(name, email, password);

            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            onToggle(false);

        } catch (error) {
            console.error("failed:", error);
        }
    };

    return (
        <div className="create-form-container">
            <div className="form-header">
                <h1>Create Account</h1>
            </div>

            <form className="create-form ">
                <div className="label-input">
                    <label htmlFor="name">Name </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="label-input">
                    <label htmlFor="email">Email </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="label-input">
                    <label htmlFor="password">Password </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="label-input">
                    <label htmlFor="check-password">Confirm</label>
                    <input
                        id="check-password"
                        name="check-password"
                        type="password"
                        required
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button
                    className="black-button"
                    type="submit"
                    onClick={handleUserCreation}
                >
                    Create
                </button>
            </form>

            <div className="bottom-form">
                <p>Already have an account?</p>
                <span className="create-toggle" onClick={() => onToggle(false)}>
                    Login
                </span>
            </div>
        </div>
    );
}

export default Register;
