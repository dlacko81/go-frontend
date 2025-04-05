
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const API = "https://go-backend-8us9.onrender.com"; // replace this after backend is live

function App() {
  const [gos, setGOs] = useState([]);
  const [search, setSearch] = useState("");
  const [report, setReport] = useState([]);

  const fetchGOs = async () => {
    const res = await axios.get(API);
    setGOs(res.data);
  };

  const fetchReport = async () => {
    const res = await axios.get(API + "/report");
    setReport(res.data);
  };

  const handleAdd = async () => {
    const name = prompt("Name:");
    const country = prompt("Country:");
    const tech = prompt("Technology:");
    const volume = parseFloat(prompt("Volume:"));
    const date = prompt("Date (YYYY-MM-DD):");

    await axios.post(API, { name, country, tech, volume, date });
    fetchGOs();
    fetchReport();
  };

  const handleSearch = async () => {
    const res = await axios.get(API + "/search?name=" + search);
    setGOs(res.data);
  };

  useEffect(() => {
    fetchGOs();
    fetchReport();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>GO Portfolio</h1>

      <div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name"
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleAdd}>Add GO</button>
      </div>

      <h2>GOs</h2>
      <ul>
        {gos.map((go, idx) => (
          <li key={idx}>
            {go.name} – {go.country} – {go.tech} – {go.volume} – {go.date?.slice(0, 10)}
          </li>
        ))}
      </ul>

      <h2>Portfolio Report</h2>
      <Bar
        data={{
          labels: report.map((r) => r._id),
          datasets: [{ label: "Volume", data: report.map((r) => r.total), backgroundColor: "teal" }]
        }}
      />
    </div>
  );
}

export default App;
