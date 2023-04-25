import { Routes, Route } from 'react-router-dom';
// import logo from './logo.svg';
import HomePage from './pages/home';
import RoomPage from './pages/room';
import Login from './pages/Credential/Login';
import Logout from './pages/Credential/Logout';
import Register from './pages/Credential/Register';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route path='/logout' element={<Logout/>}/> 
      </Routes>
    </div>
  );
}

export default App;
