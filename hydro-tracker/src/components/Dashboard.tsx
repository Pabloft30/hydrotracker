import { useEffect, useState } from 'react';
import { getUser } from '../controller/UserController';
import { User } from '../types/user';

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const allUsers: User[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const user = getUser(key);
        if (user) {
          allUsers.push(user);
        }
      }
    }
    setUsers(allUsers);
  }, []);

  return (
    <div className="container">
      <h2>Historial de Usuarios</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre de Usuario</th>
            <th>Meta Diaria</th>
            <th>Agua Consumida</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.username}>
                <td>{user.username}</td>
                <td>{user.dailyGoal ? `${user.dailyGoal} ml` : 'No establecido'}</td>
                <td>{user.waterConsumed ? `${user.waterConsumed} ml` : '0 ml'}</td>
                <td>
                  {user.waterConsumed && user.dailyGoal && user.waterConsumed >= user.dailyGoal ? (
                    <span>¡Meta alcanzada!</span>
                  ) : (
                    <span>Aún no ha alcanzado la meta.</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No hay usuarios registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;