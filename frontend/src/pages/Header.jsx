import React from 'react';
import IconHome from "../assets/icons/header_home.svg";
import "../assets/css/header.css";
import { useNavigate } from 'react-router-dom';
import IconLogout from "../assets/icons/Icon_logout.svg";

function Header(props) {
    const navigate = useNavigate();
    const goHomePage = () => {
        navigate("/");
    }
  
  
    const logout = () => {
      sessionStorage.removeItem("estory-info");
      sessionStorage.removeItem("estory-user");
      navigate("/welcome");
    }


    return (
        <div className='header'>
          <div></div>
          <div className='header-table'>
            <div onClick={goHomePage} className='header-table-items'>
              <img src={IconHome} alt="icon home" className='icon-home table-icons'></img>
              <div className='table-text'>Home</div>
            </div>

            
          </div>
    
          <button className="log-out" onClick={logout}><img src={IconLogout} alt="icon logout"></img></button>
        </div>
    );
}

export default Header;