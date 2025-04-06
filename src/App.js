import React, { useState, useEffect } from 'react';

function App() {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [volume, setVolume] = useState('');
  const [tech, setTech] = useState('');
  const [date, setDate] = useState('');
  const [gos, setGOs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newGO = { name, country, volume: Number(volume), tech, date };

    try {
      const res = await fetch('https://your-backend-url.onrender.com/api/gos', { // Replace with your backend URL from Render
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGO),
      });

      const data = await res.json();
      console.log('Saved:', data);
      setGOs([...gos, data]);
    } catch (err) {
      console.error('Error submitting GO:', err);
    }
  };

  useEffect(() => {
    fetch('https://go-backend-8us9.onrender.com') // Replace with your backend URL from Render
      .then((res) => res.json())
      .then((data) => setGOs(data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Guarantees of Origin Portfolio</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required /><br />
        <input placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} required /><br />
        <input type="number" placeholder="Volume (MWh)" value={volume} onChange={e => setVolume(e.target.value)} required /><br />
        <input placeholder="Technology (e.g., Solar, Wind)" value={tech} onChange={e => setTech(e.target.value)} /><br />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required /><br />
        <button type="submit">Add GO Deal</button>
      </form>

      <h2>Existing GO Deals</h2>
      <ul>
        {gos.map((go, index) => (
          <li key={index}>
            {go.name} | {go.country} | {go.volume} MWh | {go.tech} | {new Date(go.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
