import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../controller/UserController';

const Login: React.FC<{ onLogin: (username: string, hasGoal: boolean) => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = getUser(username);
    if (user && user.password === password) {
      onLogin(username, !!user.dailyGoal);
      navigate(user.dailyGoal ? '/panel' : '/configuracion');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="container">
      <h1>Iniciar Sesión</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Nombre de usuario"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
      />
      <button onClick={handleLogin}>Iniciar Sesión</button>
      <button onClick={() => navigate('/register')}>No tienes una cuenta? Regístrate</button>
    </div>
  );
};

export default Login;