import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Login/LoginPage.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password });
        setPassword("");
        setEmail("");
    };

    const gotoSignUpPage = () => navigate("/SignupPage");

    return (
        <div>
            <Link to="/">
            <div className="back">
                <span style={{padding:"2px 10px 0px"}}><i class="fas fa-long-arrow-left"></i></span>
                <h3>Back to Shopping</h3>
            </div>
            </Link>
            <div className='login__container'>
                <h2>Login </h2>
                <form className='login__form' onSubmit={handleSubmit}>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='text'
                        id='email'
                        name='email'
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        minLength={8}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='loginBtn'>SIGN IN</button>
                    <p>
                        Don't have an account?{" "}
                        <span className='link' onClick={gotoSignUpPage}>
                            Sign Up
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};
export default LoginPage;

