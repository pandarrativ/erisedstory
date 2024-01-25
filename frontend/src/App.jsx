import './App.css';
import "./assets/css/color.css";
import "./assets/css/font.css";
import React, { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Login from './components/Login';
import Welcome from './pages/Welcome';
import Header from './pages/Header';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import NewStory from './pages/NewStory';
import StoryExtraction from './pages/StoryExtraction';
import StoryModify from './pages/StoryModify';


const theme = createTheme({
  palette: {
    primary: {
      main: '#dab900',
    },
    secondary: {
      main: '#E5D4BD',
    },
    button_main:{
      main: '#dab900',
    },
    button_reverse: {
      main: '#10cfff'
    },
    button_light:{
      main:"#C3DCE3",
    }
  },

});

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
      <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<><Header showHeader={showHeader} toggleShowHeader={toggleShowHeader}></Header><Home></Home></>}></Route>
              <Route path='/login' element={<Login></Login>}></Route>
              <Route path="/welcome" element={<Welcome></Welcome>}></Route>
              <Route path="/new-story" element={<><Header showHeader={showHeader} toggleShowHeader={toggleShowHeader}></Header><NewStory></NewStory></>}></Route>
              <Route path="/story-extract" element={<><Header showHeader={showHeader} toggleShowHeader={toggleShowHeader}></Header><StoryExtraction></StoryExtraction></>}></Route>
              <Route path="/story-modify" element={<><Header showHeader={showHeader} toggleShowHeader={toggleShowHeader}></Header><StoryModify></StoryModify></>}></Route>
            </Routes>
          
          </BrowserRouter>
      </ThemeProvider>
      </>
    );
  
}

export default App;
