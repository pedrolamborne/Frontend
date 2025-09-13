import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const fetchMessages = async () => {
    const res = await axios.get('https://lambo-chat.vercel.app/api/messages', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setMessages(res.data);
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async () => {
    const formData = new FormData();
    formData.append('text', text);
    formData.append('from', user.id);
    formData.append('to', 'all');
    if (file) formData.append('image', file);

    await axios.post('https://lambo-chat.vercel.app/api/messages', formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setText('');
    setFile(null);
    fetchMessages();
  };

  return (
    <div>
      <h2>Chat</h2>
      <div className="messages">
        {messages.map(m => (
          <div key={m.id}>
            <b>{m.from}</b>: {m.text}
            {m.image && <img src={m.image} alt="msg" width="100" />}
          </div>
        ))}
      </div>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Digite uma mensagem" />
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleSend}>Enviar</button>
    </div>
  );
}
