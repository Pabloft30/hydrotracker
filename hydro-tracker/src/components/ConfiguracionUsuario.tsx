import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../controller/UserController';

interface ConfiguracionUsuarioProps {
  username: string;
  onGoalSet: () => void;
}

const ConfiguracionUsuario: React.FC<ConfiguracionUsuarioProps> = ({ username, onGoalSet }) => {
  const [dailyGoal, setDailyGoal] = useState<number>(0);
  const navigate = useNavigate();

  const handleSave = () => {
    updateUser(username, { dailyGoal, waterConsumed: 0 }); // Reset waterConsumed when setting a new goal
    onGoalSet();
    navigate('/panel');
  };

  return (
    <div className="container">
      <h2>Configurar Meta Diaria</h2>
      <input
        type="number"
        value={dailyGoal}
        onChange={(e) => setDailyGoal(Number(e.target.value))}
        placeholder="Meta diaria de agua (ml)"
      />
      <button onClick={handleSave}>Guardar</button>
    </div>
  );
};

export default ConfiguracionUsuario;