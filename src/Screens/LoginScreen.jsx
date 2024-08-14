import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';
import "../Styles/LoginScreenStyle.css";
import { useNavigate, Link } from "react-router-dom";
// import myImage from '../assets/images/logo.png';



function LoginScreen() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
      navigate("/home");
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <>
      <div className="MainContainer">
        <div className="LeftContainer">
          <div className="ImageContainer">
            <img src="/image/app-bg.jpg" alt="bg-image" />
          </div>
        </div>

        <div className="RightContainer">
          <div className="RightContent">
            <h2 className="LoginText">Log in</h2>
            <form className="Form" onSubmit={handleLogin}>
              <label>Email</label>
              <input
                type="text"
                id="Email"
                placeholder="Email"
                className="InputBox"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>Password</label>
              <input
                type="password"
                id="Password"
                placeholder="Password"
                className="InputBox"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit" className="LoginButton">
                Login
              </button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <a href="/" className="forgot-password">
              Forgot your password?
            </a>

            <Link to="/signup" className="Signup">
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginScreen;
