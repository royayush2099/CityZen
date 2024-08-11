import React from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../assets/Data/HomeData.json';
import '../Styles/HomeScreen.css';

function HomeScreen() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <h2>Navbar</h2>
        <ul>
          <li><a href="#">Opt</a></li>
          <li><a href="#">Opt</a></li>
          {/* Add more nav items here */}
        </ul>
        {/* Profile Section */}
        <div className="profile-section">
          <img src="/path/to/your/avatar.jpg" alt="Profile Avatar" className="profile-avatar" />
          <div className="profile-name">Your Name</div>
        </div>
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
