import React from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../assets/Data/HomeData.json';
import './Page-css/AImodel.css';
import DropdownMenu from '../Components/DropdownMenu';

function AImodel() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };
    return (
        <>
            <DropdownMenu/>
            <div className="title">
                <h1>A.I. Models</h1>
            </div>
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
        </>
    )
}

export default AImodel