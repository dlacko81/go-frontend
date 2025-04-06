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

    const newGO = {
      name,
      country,
      volume: Number(volume),
      tech,
      date: new Date(date)
    };

    console.log('GO to send:', newGO);

    try {
      const res = await fetch('https://your-backend-url.onrender.com/api/gos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGO),
      });

      const data = await res.json();
      console.log('Saved:', data);
      setGOs([...gos, data]);

      // Optional: Reset form
      setName('');
      setCountry('');
      setVolume('');
      setTech('');
      setDate('');
    } catch (err) {
      console.error('Error submitting GO:', err
