import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import '../Styles/HomeScreen.css';
import DropdownMenu from '../Components/DropdownMenu';
import Calandar from '../Components/Calandar';



function HomeScreen() {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
      console.log("Signed out successfully")
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <>
      <div className="dashboard-container">
        <DropdownMenu />
        <div className="dasb-content">

          <div className="left-cont">
            <nav className="dashboard-navbar">
              <div className="nav-items">
                <ul>
                  <li><a href="Page1"> <img src="/image/accident.png" alt="img" />Accident</a></li>
                  <li><a href="Page2"> <img src="/image/road.png" alt="img" />Infrastructure</a></li>
                  <li><a href="Page3"> <img src="/image/cyber-security.png" alt="img" />Crime</a></li>
                  <li><a href="Page4"> <img src="/image/traffic-light.png" alt="img" />Traffic</a></li>
                  {/* Add more nav items here */}
                </ul>

              </div>
              <div>
                <button onClick={handleLogout}>
                  <img src="/image/logout.png" alt="img" />Logout
                </button>
              </div>
            </nav>
          </div>
          <div className="right-cont">
            <div className="right-cont-top">

              <div className="header">
                <div className="user-message">
                  <h2>Welcome back, :)</h2>
                </div>
                <div className="panel">
                  <div className="calendar-container">
                    <Calandar />
                  </div>
                </div>

              </div>
              <div className="incident-alert">
                <div className="alert-history">
                  <h2>Alert History</h2>
                  <p>alert history data fetching</p>
                </div>
              </div>
            </div>
            <div className="right-cont-bottom">

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HomeScreen;
