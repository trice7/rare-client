import { useEffect, useState } from 'react';
import getUsers from '../api/usersData';
import UserCard from '../components/utils/usersCard';

export default function UserList() {
  const [users, setUsers] = useState([]);

  const getAllUsers = () => {
    getUsers().then(setUsers);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {users.map((user) => (
        <UserCard key={user.id} userObj={user} />
      ))}
    </div>
  );
}
