import React, { useEffect, useState } from 'react';
import './MovingAlerts.css';
import alertsData from './Alert.json'; // Importing the JSON file

const MovingAlerts = () => {
  const [position, setPosition] = useState(0);
  const alertHeight = 50; // Adjust this based on the height of a single alert
  const totalHeight = alertHeight * alertsData.alerts.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => {
        const newPosition = prevPosition + 1;
        return newPosition >= totalHeight ? 0 : newPosition;
      });
    }, 50); // Adjust the speed by changing the interval time

    return () => clearInterval(interval);
  }, [totalHeight]);

  return (
    <div className="alert-container">
      <div
        className="alert-content"
        style={{ transform: `translateY(-${position}px)` }}
      >
        {alertsData.alerts.concat(alertsData.alerts).map((alert, index) => (
          <p key={index} className="alert">
            {alert}
          </p>
        ))}
      </div>
    </div>
  );
};

export default MovingAlerts;
