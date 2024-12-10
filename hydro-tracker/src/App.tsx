import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import ConfiguracionUsuario from './components/ConfiguracionUsuario';
import PanelPrincipal from './components/PanelPrincipal';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Navbar from './components/NavBar';
import './styles.css';

const App: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [hasGoal, setHasGoal] = useState<boolean>(false);

  const handleLogin = (username: string, hasGoal: boolean) => {
    setUsername(username);
    setIsLoggedIn(true);
    setHasGoal(hasGoal);
  };

  const handleLogout = () => {
    setUsername('');
    setIsLoggedIn(false);
    setHasGoal(false);
  };

  return (
    <Router>
      {isLoggedIn && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to={hasGoal ? "/panel" : "/configuracion"} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/panel" element={<PanelPrincipal username={username} />} />
        <Route path="/configuracion" element={<ConfiguracionUsuario username={username} onGoalSet={() => setHasGoal(true)} />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;