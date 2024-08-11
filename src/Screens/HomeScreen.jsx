import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import data from '../assets/Data/HomeData.json';
import '../Styles/HomeScreen.css';

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
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-items">
          <h2>Navbar</h2>
          <ul>
            <li><a href="Page1">Accident</a></li>
            <li><a href="Page2">Infrastructure</a></li>
            <li><a href="Page3">Crime</a></li>
            <li><a href="Page4">Traffic</a></li>
            <li><a href="#">History</a></li>
            {/* Add more nav items here */}
          </ul>

        </div>
        <div>
          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
        {/* Profile Section */}
        {/* <div className="profile-section">
            <img src="/path/to/your/avatar.jpg" alt="Profile Avatar" className="profile-avatar" />
            <div className="profile-name">Your Name</div>
          </div> */}
      </nav>
      <div className="content-container">
        {data.items.map((item) => (
          <div key={item.id} className="content-item">
            <img src={item.image} alt={item.name} />
            <div className="item-text">
              <h3>{item.name}</h3>
              <p>{item.subtitle}</p>
              <button onClick={() => handleNavigation(`/page${item.id}`)}>Step Inside to Explore</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HomeScreen;
