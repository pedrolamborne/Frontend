import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('https://SEU_BACKEND_URL/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}
