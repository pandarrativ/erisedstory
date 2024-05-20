import './App.css';
import axios from 'axios';
import Routers from './router';
import { useSelector } from 'react-redux';



function App() {
  // for production
  // axios.defaults.withCredentials = true;

  const theme =  useSelector((state) => state.userSettings.theme);



  return (
    <div className={`App ${theme}`}>
        <Routers></Routers>
    </div>
  );
}

export default App;
