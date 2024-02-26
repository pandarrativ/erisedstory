import './App.css';
import "./assets/css/color.css";
import "./assets/css/font.css";
import React, { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';

import Welcome from './pages/Welcome';
import Header from './pages/Header';
import Storypage from './pages/Stroypage';



function App() {
  const [showHeader, setShowHeader] = useState(true);
  const toggleShowHeader = (e) => {
    e.preventDefault();
    console.log(showHeader);
    setShowHeader(!showHeader);
  }

  useEffect(() => {
    document.title = "Erised Story";
  }, []);
  
  

    return (
      <>
        <BrowserRouter>
            <Routes>
              <Route path='/home' element={<><Header showHeader={showHeader} toggleShowHeader={toggleShowHeader}></Header><Home></Home></>}></Route>
              <Route path="/" element={<Welcome></Welcome>}></Route>
              <Route path="/story-page" element={<><Header showHeader={showHeader} toggleShowHeader={toggleShowHeader}></Header><Storypage></Storypage></>}></Route>
            </Routes>
          
          </BrowserRouter>
      </>
    );
  
}

export default App;
