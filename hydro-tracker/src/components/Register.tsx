import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, saveUser } from '../controller/UserController';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();

  const handleRegister = () => {
    const user = getUser(username);
    if (!user) {
      saveUser({ username, password, email });
      alert('Usuario registrado');
      navigate('/login');
    } else {
      alert('Usuario ya registrado');
    }
  };

  return (
    <div className="container">
      <h1>Registrarse</h1>
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
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button onClick={handleRegister}>Registrarse</button>
      <button onClick={() => navigate('/login')}>Ya tienes una cuenta? Inicia sesión</button>
    </div>
  );
};

export default Register;