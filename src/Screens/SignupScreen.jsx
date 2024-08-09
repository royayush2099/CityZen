import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';
import "../Styles/SignupScreenStyle.css";
import { useNavigate, Link } from "react-router-dom";
import myImage from '../assets/images/logo.png';


function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up successfully");
      navigate("/home");
    } catch (err) {
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <>
      <div className="MainContainer">
        <div className="LeftContainer">
          <div className="LeftContent">
            <div className="ImageContainer">
              <img src={myImage} alt="Logo" />
            </div>
            <div>
              <p className="LeftContentTextHeading">
                CityZen - Smart <br />
                City Surveillance Solution.
              </p>
              <p className="LeftContentTextHeadingSub">
                Real-time incident monitoring and alerts.
              </p>
            </div>
          </div>
        </div>

        <div className="RightContainer">
          <div className="RightContent">
            <h2 className="SignupText">Sign Up</h2>
            <form className="Form" onSubmit={handleSignup}>
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

              <label>Confirm Password</label>
              <input
                type="password"
                id="ConfirmPassword"
                placeholder="Confirm Password"
                className="InputBox"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button type="submit" className="SignupButton">
                Sign Up
              </button>
            </form>
            {error && <p className="error-message">{error}</p>}

            <Link to="/" className="Login">
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupScreen;
