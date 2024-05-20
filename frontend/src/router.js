import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Welcome from './pages/Welcome/Welcome';
import Learning from './pages/Learning/Learning';
import Genre from './pages/Genre/Genre';
import Story from './pages/Story/Story';
import Game from './pages/Game/Game';

const ProtectedRoute = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  };

  const isAuthenticated = true;

export default function Routers(){  
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome isAuthenticated={isAuthenticated}/>}></Route>    

          <Route path="/learning" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Learning/>
            </ProtectedRoute>}>
          </Route>

          <Route path="/genre" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Genre/>
            </ProtectedRoute>}>
          </Route>

          <Route path="/story" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Story/>
            </ProtectedRoute>}>
          </Route>

          <Route path="/game" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Game/>
            </ProtectedRoute>}>
          </Route>
        </Routes>
      </BrowserRouter>
    )
};