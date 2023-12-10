import React, { useState } from 'react';
import "../assets/css/welcome.css"
import WelcomeImg from "../assets/imgs/welcome.png"
import { Button } from '@mui/material';
import Login from '../components/Login';
import Signup from '../components/Signup';

function Welcome(props) {
    const [showLogin, setShowLogin] = useState(true);
    const toggleShowLogin = (e) => {
        e.preventDefault();
        setShowLogin(!showLogin);
    }

    return (
        <div className='welcome'>
            <div className='welcome-top'>
                <div className='welcome-title font-c2'>Erised Story</div>

                <Button className='button-secondary font-c3' onClick={toggleShowLogin}>Sign Up</Button>
            </div>
            <div className='welcome-left'>
                <div className='welcome-left-top'>
                    <div className='welcome-subheader text-dec'>Phobia Platform</div>
                    <div className='welcome-hedaer font-h1'>Erised Story of Your Fear</div>
                    <div className='welcome-description'>
                        Using the power of narration to provide more immersive and enjoyable rumination releasing experience
                    </div>
                </div>
                

                <div className='welcome-login'>
                    {showLogin ? <Login></Login>  : <Signup></Signup>}
                </div>
            
            </div>

            <div className='welcome-right'>
            
                <div className='img-box welcome-img'>
                    <img src={WelcomeImg} alt="welcom img" className='box-img'></img>
                </div>
            </div>
        </div>
    );
}

export default Welcome;