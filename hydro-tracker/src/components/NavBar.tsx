import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/panel">Panel Principal</Link></li>
        <li><Link to="/configuracion">Configuración Usuario</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><button onClick={handleLogout}>Cerrar Sesión</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;