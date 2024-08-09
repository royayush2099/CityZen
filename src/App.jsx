// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import HomeScreen from "./Screens/HomeScreen";
import LoadingScreen from './Screens/LoadingScreen'; // Import the LoadingScreen component

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay, for example 2 seconds (you can adjust this)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />} {/* Show loading screen if isLoading is true */}
      <div className={`App-body ${isLoading ? 'hidden' : ''}`}>
        <Router>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/home" element={<HomeScreen />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
