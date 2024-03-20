import './App.css';
import "./assets/css/color.css";
import "./assets/css/font.css";
import React, { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';


import Welcome from './pages/Welcome';
import Learning from './pages/Learning';
import Genre from './pages/Genre';
import Story from './pages/Story';
import Game from './pages/Game';
import Header from './pages/Header';
import Storypage from './pages/Stroypage';


import Saga from './pages/Saga';


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
              <Route path="/" element={<Saga><Welcome /></Saga> }></Route>              
              <Route path="/learning" element={<Saga><Learning/></Saga>}></Route>
              <Route path="/genre" element={<Saga><Genre/></Saga>}></Route>
              <Route path="/story" element={<Saga><Story/></Saga>}></Route>
              <Route path="/game" element={<Saga><Game/></Saga>}></Route>

              {/* <Route path='/home' element={<><Header showHeader={showHeader} toggleShowHeader={toggleShowHeader}></Header><Home></Home></>}></Route>
              <Route path="/story-page" element={<><Header showHeader={showHeader} toggleShowHeader={toggleShowHeader}></Header><Storypage></Storypage></>}></Route> */}
            </Routes>
        </BrowserRouter>
      </>
    );
  
}

export default App;
