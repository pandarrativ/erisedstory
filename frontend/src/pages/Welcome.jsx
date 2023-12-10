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
                <Button className='button-secondary'>Sign Up</Button>
            </div>
            <div className='welcome-left'>
                <div className='welcome-subheader'>Phobia Platform</div>
                <div className='welcome-hedaer'>Erised Story of Your Fear</div>
                <div className='welcome-description'>
                    Using the power of narration to provide more immersive and enjoyable rumination releasing experience
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