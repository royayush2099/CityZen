// LoadingScreen.jsx
import React from 'react';
import '../Styles/LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="logo-container">
        {/* <h1>CityZen</h1> */}
        <img src="/image/logo.png" alt="" />
      </div>
    </div>
  );
};

export default LoadingScreen;
