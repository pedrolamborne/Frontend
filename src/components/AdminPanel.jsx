import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPanel({ user }) {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get('https://lambo-chat.vercel.app/api/users', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setUsers(res.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Deseja realmente excluir este usuário?')) return;
    await axios.delete(`https://lambo-chat.vercel.app/api/users/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    fetchUsers();
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <div>
      <h2>Painel Admin</h2>
      {users.map(u => (
        <div key={u.id}>
          {u.name} ({u.email}) <button onClick={() => handleDelete(u.id)}>Excluir</button>
        </div>
      ))}
    </div>
  );
}
