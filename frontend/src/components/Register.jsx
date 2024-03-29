import React, { useState } from "react";
// import "../assets/css/login.css";

function Login({ onLogin, error }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        // validate inputs here
        // if inputs are valid:
        onLogin(email, password);
        setEmail("");
        setPassword("");
    };

    return (
        <>
        <form onSubmit={submitHandler}>
                <div className="input-field">
                        <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onInput={handleInput}
                                placeholder="Email"
                        />
                </div>

                <div className="input-field">
                        <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onInput={handleInput}
                                placeholder="Password"
                        />
                </div>

                <button type="submit" className="login-btn">Log In -{">"}</button>
        </form>
        { error.message && <span className="error-msg">{error.message}</span> }
        
        </>
    );
}


export default Login;
