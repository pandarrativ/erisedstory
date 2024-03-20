import React from 'react';
import "../assets/css/welcome.css"
import { useNavigate } from 'react-router-dom';
import Welcome_title from '../assets/imgs/Welcome_title.png';
import Arrow from '../assets/imgs/Arrow.png';
import saga_agent from '../assets/imgs/saga_agent.png';


function Welcome() {
    const navigate = useNavigate();

    return (
        <div className='welcome'>
            <div className='welcome-top'>
                <img src= {Welcome_title} alt="welcome title" className='welcome-title'></img>
                <img src= {Arrow} alt="arrow" className='arrow'  onClick={() => navigate("/Learning")}></img>
            </div>

            {/* <div className='welcome-left'>
                <div className='welcome-login'>
                    {showLogin ? <Login></Login>  : <Signup></Signup>}
                    <button className='login-form-submit' onClick={() => navigate("/home")}>Continue</button>
                </div>
            </div> */}

            <div className='welcome-bottom'>
                <img src= {saga_agent} alt="asga agent" className='saga-agent'></img>
            </div>

        </div>
    );
}

export default Welcome;