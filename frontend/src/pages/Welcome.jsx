import React, {useState} from 'react';
import "../assets/css/welcome.css"
import { useNavigate } from 'react-router-dom';

// import Modal from '../components/LoginModal';
// import Login from '../components/Login';
// import Register from '../components/Register';

import Welcome_title from '../assets/imgs/Welcome_title.png';
import Arrow from '../assets/imgs/Arrow.png';
import saga_agent from '../assets/imgs/saga_agent.png';


function Welcome() {
    const navigate = useNavigate();
    // const [showModal, setshowModal] = useState(false);
    // const [isLogin, setIsLogin] = useState(true);

    // const handleLogin = () => {
    //     setshowModal(false);
    //     navigate("/Learning");
    // };

    return (
        <div className='welcome'>
            <div className='welcome-top'>
                <img src= {Welcome_title} alt="welcome title" className='welcome-title'></img>
                <img src= {Arrow} alt="arrow" className='arrow'  onClick={() => navigate("/Learning")}></img>
            </div>

            {/* {showModal && (
                <Modal onClose={() => setshowModal(false)}>
                    {isLogin ? (
                        <Login onLogin={handleLogin} />
                    ) : (
                        <Register onRegister={handleLogin} />
                    )}
                    <button onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Switch to Register" : "Switch to Login"}
                    </button>
                </Modal>
            )} */}

            <div className='welcome-bottom'>
                <img src= {saga_agent} alt="asga agent" className='saga-agent'></img>
            </div>

        </div>
    );
}

export default Welcome;