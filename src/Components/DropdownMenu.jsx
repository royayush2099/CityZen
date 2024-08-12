import React, { useState } from 'react';
import './DropdownMenu.css'; // Importing the CSS


function DropdownMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="navbar">
            <div className="logo">
                <img src="/image/logo.png" alt="CityZen" />
            </div>
            <div className="menu-icon" onClick={toggleMenu}>
                <img src="/image/add.png" alt="Menu" className={`menu-image ${isOpen ? 'rotated' : ''}`} />
            </div>
            {isOpen && (
                <div className="dropdown-menu">
                    <ul>
                        <li><a href="home">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="model">AI Models</a></li>
                        <li><a href="#">Feedback</a></li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default DropdownMenu;
