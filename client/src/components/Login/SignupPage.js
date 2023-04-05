import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';
import "../Login/LoginPage.css";

const SignupPage = () => {
    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [email, setEmail] = useState("");
  //  const [username, setUsername] = useState("");
    const [tel, setTel] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, tel, password });
        signupUser();
        
    //    setUsername("");
        setPassword("");
    };
    
    const signupUser = ()=>{
    
    axios.post(`https://shopworld.onrender.com/signup`,{
      fName,
      lName,
      email,
      'phone':tel,
      'pwd':password
    }).then(res => {
      if(res.status===200){
        alert("Success");
        setEmail("");
        setfName("");
        setlName("");
        setTel("");
        setPassword("");
      }
    }).catch(err=>{
      alert(err.response.data.errMsg);
    })
  }
    const gotoLoginPage = () => navigate("/loginPage");

    return (
        <div>
            <Link to="/">
        <div className="back">
            <span style={{padding:"2px 10px 0px"}}><i class="fas fa-long-arrow-left"></i></span>
            <h3>Back to Shopping</h3>
        </div>
        </Link>
        <div className='signup__container'>
            <h2>Sign up </h2>
            <form className='signup__form' onSubmit={handleSubmit}>
                <label htmlFor='fName'>First Name</label>
                <input
                    type='text'
                    name='fName'
                    id='fName'
                    value={fName}
                    required
                    onChange={(e) => setfName(e.target.value)}
                />
                <label htmlFor='lName'>Last Name</label>
                <input
                    type='text'
                    name='lNamr'
                    id='lName'
                    value={lName}
                    required
                    onChange={(e) => setlName(e.target.value)}
                />
                <label htmlFor='email'>Email Address</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
               {/* <label htmlFor='username'>Username</label>
                <input
                    type='text'
                    id='username'
                    name='username'
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />*/}
                <label htmlFor='tel'>Phone Number</label>
                <input
                    type='tel'
                    name='tel'
                    id='tel'
                    value={tel}
                    required
                    onChange={(e) => setTel(e.target.value)}
                />
                <label htmlFor='tel'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    minLength={8}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='signupBtn'>SIGN UP</button>
                <p>
                    Already have an account?{" "}
                    <span className='link' onClick={gotoLoginPage}>
                        Login
                    </span>
                </p>
            </form>
        </div>
        </div>
    );
};

export default SignupPage;