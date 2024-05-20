import React from 'react';
import "./welcome.css"
import { useNavigate } from 'react-router-dom';

// import Modal from '../components/LoginModal';
// import Login from '../components/Login';
// import Register from '../components/Register';

import Welcome_title from '../../assets/imgs/Welcome_title.png';

import Arrow from '../../assets/imgs/Arrow.png';
// import saga_agent from '../assets/imgs/saga_agent.png';


function Welcome() {
    const navigate = useNavigate();

    return (
        <div className='welcome'>
            <div className='welcome-top'>
                <img src= {Welcome_title} alt="welcome title" className='welcome-title'></img>
                <button onClick={() => navigate("/learning")}><img src= {Arrow} alt="arrow" className='arrow'></img></button>
            </div>
        </div>
    );
}

export default Welcome;