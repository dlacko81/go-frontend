"use client";

import { useState, useEffect } from "react";

const initialForm = {
  clientName: "",
  transactionDate: "",
  volume: "",
  vintage: "",
  technology: "Any",
  country: "Any",
  price: "",
  comments: "",
};

export default function InputForm() {
  const [form, setForm] = useState(initialForm);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://go-backend-1-lxgb.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert("Submitted successfully");
        setForm(initialForm);
        fetchData();
      } else {
        alert("Failed to submit");
      }
    } catch (err) {
      console.error("Submission error", err);
      alert("Error submitting data");
    }
    setLoading(false);
  };

  const fetchData = async () => {
    try {
      const res = await fetch("https://your-backend-url.onrender.com/api/data");
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Fetching error", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input name="clientName" placeholder="Client Name" value={form.clientName} onChange={handleChange} required className="p-2 border rounded" />
        <input name="transactionDate" type="date" value={form.transactionDate} onChange={handleChange} required className="p-2 border rounded" />
        <input name="volume" type="number" placeholder="Volume (MWh)" value={form.volume} onChange={handleChange} required className="p-2 border rounded" />
        <input name="vintage" type="number" placeholder="Vintage (Year)" value={form.vintage} onChange={handleChange} required className="p-2 border rounded" />
        <select name="technology" value={form.technology} onChange={handleChange} className="p-2 border rounded">
          <option>Wind</option>
          <option>Solar</option>
          <option>Hydro</option>
          <option>Any</option>
          <option>Other</option>
        </select>
        <select name="country" value={form.country} onChange={handleChange} className="p-2 border rounded">
          <option>Austria</option>
          <option>Belgium</option>
          <option>Croatia</option>
          <option>France</option>
          <option>Germany</option>
          <option>Italy</option>
          <option>Netherlands</option>
          <option>Spain</option>
          <option>Sweden</option>
          <option>Any</option>
        </select>
        <input name="price" type="number" placeholder="Price (EUR/MWh)" value={form.price} onChange={handleChange} required className="p-2 border rounded" />
        <textarea name="comments" placeholder="Comments" value={form.comments} onChange={handleChange} className="p-2 border rounded col-span-2" />
        <button type="submit" className="col-span-2 bg-blue-600 text-white p-2 rounded" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Stored Transactions</h2>
        <table className="w-full border text-sm">
          <thead>
            <tr>
              <th>Client</th>
              <th>Date</th>
              <th>Volume</th>
              <th>Vintage</th>
              <th>Tech</th>
              <th>Country</th>
              <th>Price</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-4">No data yet.</td>
              </tr>
            )}
            {data.map((row, index) => (
              <tr key={index} className="text-center border-t">
                {row.map((cell, i) => (
                  <td key={i} className="px-2 py-1">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
