import './App.css';
import "./assets/css/color.css";
import "./assets/css/font.css";
import React, { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
// import Home from './pages/Home';

// import { LOGIN_STATUS, SERVER, CLIENT, MESSAGES} from "./config/constants.js";
// import {fetchLogin, fetchLogout, fetchSession} from "./config/Services";

import Welcome from './pages/Welcome';
import Learning from './pages/Learning';
import Genre from './pages/Genre';
import Story from './pages/Story';
import Game from './pages/Game';

// import Header from './pages/Header';
// import Storypage from './pages/Stroypage';


import Saga from './pages/Saga';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {

  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);
  // const isAuthenticated = loginStatus === LOGIN_STATUS.IS_LOGGED_IN;

  // const [showHeader, setShowHeader] = useState(true);
  // const toggleShowHeader = (e) => {
  //   e.preventDefault();
  //   console.log(showHeader);
  //   setShowHeader(!showHeader);
  // }

  async function onLogin(username, password) {
    // fetchLogin(username)
    //   .then((user) => {
    //     const { userData } = user;
    //     setUserDetails(userData);
    //     setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
    //   })
    //   .catch((err) => {
    //     setError(MESSAGES[err?.error] || "ERROR");
    //   });

    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username, // Assuming username is email
          password: password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUserDetails(data);
        setIsAuthenticated(true);
      } else{
        const errorData = await response.json();
        console.log(errorData);
        setError(errorData);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  function onLogout() {
    //   setError("");
    //   setUserDetails({});
    //   setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    //   fetchLogout().catch((err) => {
    //     setError("ERROR");
    //   });
    setIsAuthenticated(false);
    }
    

  useEffect(() => {
    document.title = "Erised Story";
  }, []);
  
  

    return (
      <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Saga> 
              <Welcome/>
            </Saga> }></Route>    

          <Route path="/learning" element={
              <Saga><Learning/></Saga>}>
          </Route>

          <Route path="/genre" element={
            <Saga><Genre/></Saga>
          }>
          </Route>

          <Route path="/story" element={
            <Saga><Story/></Saga>
          }>
          </Route>

          <Route path="/game" element={
            <Saga><Game/></Saga>}>
          </Route>
        </Routes>
      </BrowserRouter>
      </>
    );
  
}

export default App;
