import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const API = "https://go-backend-8us9.onrender.com";

export default function Report() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(API).then(res => setData(res.data));
  }, []);

  const chartData = {
    labels: data.map(d => d._id),
    datasets: [{
      data: data.map(d => d.total),
      backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
    }]
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Portfolio Report</h2>
      <Pie data={chartData} />
    </div>
  );
}
