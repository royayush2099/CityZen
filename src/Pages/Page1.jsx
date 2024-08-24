import React, { useEffect, useState } from 'react';

function Page1() {
  const [videoSrc, setVideoSrc] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Set the video source to the Flask endpoint for streaming
    setVideoSrc('http://localhost:5000/video_feed');

    // Establish an EventSource connection to listen for alerts
    const eventSource = new EventSource('http://localhost:5000/alerts');

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
      {/* Left side: Video feed */}
      <div style={{ flex: 3, padding: '10px' }}>
        <h2>Real-Time Video Accident Detection:</h2>
        {videoSrc && (
          <img 
            src={videoSrc} 
            alt="video stream" 
            style={{ 
              width: '100%',  
              height: '100%', 
              objectFit: 'cover',
              border: '1px solid black' 
            }} 
          />
        )}
      </div>
      
      {/* Right side: Alert history box */}
      <div style={{ flex: 1, padding: '10px', maxHeight: '100vh', overflowY: 'auto' }}>
        <div style={{
          border: '1px solid black',
          padding: '10px',
          backgroundColor: '#f9f9f9',
          borderRadius: '5px',
          height: '100%'
        }}>
          <h3>Alert History</h3>
          <button 
            onClick={clearHistory} 
            style={{ 
              padding: '5px 10px', 
              marginBottom: '10px',
              backgroundColor: '#ff4d4d',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            Clear History
          </button>
          <ul>
            {alerts.map((alert, index) => (
              <li key={index}>{alert}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Page1;
