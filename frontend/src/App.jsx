import './App.css';
import "./assets/css/color.css";
import "./assets/css/font.css";
import React, { Component } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Login from './components/Login';
import Welcome from './pages/Welcome';
import Header from './pages/Header';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import NewStory from './pages/NewStory';


const theme = createTheme({
  palette: {
    primary: {
      main: '#F7F2EC',
    },
    secondary: {
      main: '#E5D4BD',
    },
    button_main:{
      main: '#BF8B70',
    },
    button_reverse: {
      main: '#2B788B'
    },
    button_light:{
      main:"#C3DCE3",
    }
  },

});

class App extends Component {
  componentDidMount() {
    document.title = "Erised Story";
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  }
  
  render(){
    return (
      <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<><Header></Header><Home></Home></>}></Route>
              <Route path='/login' element={<Login></Login>}></Route>
              <Route path="/welcome" element={<Welcome></Welcome>}></Route>
              <Route path="/new-story" element={<><Header></Header><NewStory></NewStory></>}></Route>
            </Routes>
          
          </BrowserRouter>
      </ThemeProvider>
      </>
    );
  }
}

export default App;
