import React from 'react';
import saga_agent from '../assets/imgs/saga_agent.png';
import "../assets/css/welcome.css";

const Saga = ({ children }) => {
  return (
    <>
      {children}
      <div className='welcome-bottom'>
        <img src={saga_agent} alt="saga agent" className='saga-agent'></img>
      </div>
    </>
  );
};

export default Saga;