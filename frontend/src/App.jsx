import './App.css';
import axios from 'axios';
import Routers from './router';
import { useSelector } from 'react-redux';
import MessageModal from './components/MessageModal/MessageModal';



function App() {
  // for production
  // axios.defaults.withCredentials = true;

  const theme =  useSelector((state) => state.userSettings.theme);



  return (
    <div className={`App ${theme}`}>
        <Routers></Routers>

        <MessageModal/>
    </div>
  );
}

export default App;
