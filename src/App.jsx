import React, { useState } from 'react';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Chat from './components/Chat.jsx';
import AdminPanel from './components/AdminPanel.jsx';

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login setUser={setUser} />;
  }

  if (user.role === 'admin') {
    return <AdminPanel user={user} />;
  }

  return <Chat user={user} />;
}
