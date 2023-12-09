import './App.css';
import React, { Component } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Header from './pages/Header';

class App extends Component {
  componentDidMount() {
    document.title = "Erised Story";
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  }
  
  render(){
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<><Header></Header><Home></Home></>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path="/welcome" element={<Welcome></Welcome>}></Route>
          </Routes>
        
        </BrowserRouter>
      </>
    );
  }
}

export default App;
