import './App.css';
import "./assets/css/color.css";
import "./assets/css/font.css";
import React, { useEffect } from 'react';
import Routers from './router';



function App() {
  useEffect(() => {
    document.title = "Erised Story";
  }, []);
  


    return (
      <Routers></Routers>
    );
  
}

export default App;
