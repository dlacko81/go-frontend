import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = "https://go-backend-8us9.onrender.com";

export default function Home() {
  const [gos, setGOs] = useState([]);
  const [name, setName] = useState("");
  const [form, setForm] = useState({ name: "", country: "", volume: 0, tech: "", date: "" });

  const fetchGOs = async () => {
    const res = await axios.get(API);
    setGOs(res.data);
  };

  const submitGO = async () => {
    await axios.post(API, form);
    fetchGOs();
  };

  const searchGOs = async () => {
    const res = await axios.get(`${API}/search?name=${name}`);
    setGOs(res.data);
  };

  useEffect(() => { fetchGOs(); }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>GO Portfolio Manager</h1>
      <input placeholder="Search by name" value={name} onChange={e => setName(e.target.value)} />
      <button onClick={searchGOs}>Search</button>
      <hr />
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Country" onChange={e => setForm({ ...form, country: e.target.value })} />
      <input placeholder="Volume" type="number" onChange={e => setForm({ ...form, volume: e.target.value })} />
      <input placeholder="Technology" onChange={e => setForm({ ...form, tech: e.target.value })} />
      <input type="date" onChange={e => setForm({ ...form, date: e.target.value })} />
      <button onClick={submitGO}>Add GO</button>
      <hr />
      <ul>
        {gos.map(go => (
          <li key={go._id}>
            {go.name} ({go.country}) - {go.volume} MWh [{go.tech}]
          </li>
        ))}
      </ul>
    </div>
  );
}
