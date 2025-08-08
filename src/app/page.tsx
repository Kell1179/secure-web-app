'use client';
import { useState } from 'react';

export default function Home() {
  const [saran, setSaran] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/saran', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ saran }),
    });
    const result = await res.text();
    setMessage(result);
    setSaran('');
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Form Saran</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={saran}
          onChange={(e) => setSaran(e.target.value)}
          rows={5}
          cols={30}
        />
        <br />
        <button type="submit">Kirim</button>
      </form>
      <p>{message}</p>
    </main>
  );
}
