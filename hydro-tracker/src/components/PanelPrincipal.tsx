import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../controller/UserController';

interface PanelPrincipalProps {
  username: string;
}

const PanelPrincipal: React.FC<PanelPrincipalProps> = ({ username }) => {
  const [user, setUser] = useState(getUser(username));
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getUser(username));
  }, [username]);

  const handleAddWater = (amount: number) => {
    if (user) {
      const newWaterConsumed = (user.waterConsumed || 0) + amount;
      updateUser(username, { waterConsumed: newWaterConsumed });
      setUser({ ...user, waterConsumed: newWaterConsumed });
    }
  };

  const handleSetNewGoal = () => {
    navigate('/configuracion');
  };

  if (!user) return null;

  const hasReachedGoal = user.waterConsumed != null && user.dailyGoal != null && user.waterConsumed >= user.dailyGoal;

  return (
    <div className="container">
      <h2>Progreso Diario</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Meta diaria</th>
            <th>Agua consumida</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.dailyGoal} ml</td>
            <td>{user.waterConsumed || 0} ml</td>
            <td>
              {hasReachedGoal ? (
                <span>¡Meta alcanzada!</span>
              ) : (
                <span>Aún no has alcanzado tu meta.</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => handleAddWater(250)} disabled={hasReachedGoal}>Agregar 250ml</button>
      <button onClick={() => handleAddWater(500)} disabled={hasReachedGoal}>Agregar 500ml</button>
      <button onClick={handleSetNewGoal}>Establecer Nueva Meta</button>
    </div>
  );
};

export default PanelPrincipal;