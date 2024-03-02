import './App.css';
import "./assets/css/color.css";
import "./assets/css/font.css";
import React, { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import { LOGIN_STATUS, SERVER, CLIENT, MESSAGES} from "./config/constants.js";
import {fetchLogin, fetchLogout, fetchSession} from "./config/services";

import Home from './pages/Home';
import Welcome from './pages/Welcome';
import Header from './pages/Header';
import Storypage from './pages/Stroypage';
import Login from './pages/Login';



function App() {
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState("");
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);
  const isAuthenticated = loginStatus === LOGIN_STATUS.IS_LOGGED_IN;

  const [showHeader, setShowHeader] = useState(true);
  const toggleShowHeader = (e) => {
    e.preventDefault();
    console.log(showHeader);
    setShowHeader(!showHeader);
  }

  function checkForSession() {
    // fetchSession()
    //   .then((session) => {
    //     const { userData } = session;
    //     setUserDetails({
    //       username: userData.username
    //     });
    //     setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
    //   })
    //   .catch((err) => {
    //     if (err?.error === SERVER.AUTH_MISSING) {
    //       setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    //       return Promise.reject({ error: CLIENT.NO_SESSION });
    //     }
    //     return Promise.reject(err);
    //   });
  }

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
      if (!response.ok) {
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
    setError("");
    setUserDetails({});
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    fetchLogout().catch((err) => {
      setError("ERROR");
    });
  }

  useEffect(() => {
    document.title = "Erised Story";
    checkForSession();
  }, []);
  
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login onLogin={onLogin} error={error}/>} />
            <Route path='/' element={!isAuthenticated ? <Welcome /> : <Navigate to="/home" />} />
            <Route path='/home' element={isAuthenticated ? 
              (
                <>
                  <Header showHeader={showHeader} toggleShowHeader={toggleShowHeader} onLogout={onLogout} />
                  <Home userDetails={userDetails}/>
                </>
              ) : <Navigate to="/login" />
            } />
          <Route path="/story-page" element={isAuthenticated ? 
            (
              <>
                <Header showHeader={showHeader} toggleShowHeader={toggleShowHeader} onLogout={onLogout} />
                <Storypage userDetails={userDetails}/>
              </>
            ) : <Navigate to="/login" />
          } />
              </Routes>
              
        </BrowserRouter>
      </>
    );
  
}

export default App;
