import React, { useEffect, useState } from 'react';
import './Page-css/Page2.css'; // Import the CSS file

function Page2() {
  const [videoSrc, setVideoSrc] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Set the video source to the Flask endpoint for streaming
    setVideoSrc('http://localhost:5001/video_feed');

    // Establish an EventSource connection to listen for alerts
    const eventSource = new EventSource('http://localhost:5001/alerts');

    eventSource.onmessage = (event) => {
      setAlerts(prevAlerts => [...prevAlerts, event.data]);
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
    };

    return () => {
      eventSource.close(); // Cleanup on unmount
    };
  }, []);

  // Function to clear the alert history
  const clearHistory = () => {
    setAlerts([]); // Clear the alerts state
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar/Navbar */}
      <div className="sidebar">
        <h2>Navigation</h2>
        <ul>
          <li>
            <button>Live Footage</button>
          </li>
          <li>
            <button>Video Detection</button>
          </li>
        </ul>
      </div>

      {/* Left side: Video feed */}
      <div className="video-container">
        <h2>Real-Time Video Accident Detection:</h2>
        {videoSrc && (
          <img 
            src={videoSrc} 
            alt="video stream" 
          />
        )}
      </div>

      {/* Right side: Alert history box */}
      <div className="alert-container">
        <div className="alert-box">
          <h3>Alert History</h3>
          <button className="clear-button" onClick={clearHistory}>
            Clear History
          </button>
          <ul className="alert-list">
            {alerts.map((alert, index) => (
              <li key={index}>{alert}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Page2;