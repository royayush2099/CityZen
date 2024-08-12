// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import HomeScreen from "./Screens/HomeScreen";
import LoadingScreen from './Screens/LoadingScreen'; // Import the LoadingScreen component
import AImodel from './Pages/AImodel';
import Page1 from './Pages/Page1';
import Page2 from './Pages/Page2';
import Page3 from './Pages/Page3';
import Page4 from './Pages/Page4';

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
            <Route path="/page1" element={<Page1/>}/>
            <Route path="/page2" element={<Page2/>}/>
            <Route path="/page3" element={<Page3/>}/>
            <Route path="/page4" element={<Page4/>}/>
            <Route path="/model" element={<AImodel/>}/>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
