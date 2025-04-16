'use client';

import { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    clientName: "",
    date: "",
    volume: "",
    vintage: "",
    technology: "",
    country: "",
    price: "",
    comments: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submit`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    });
    alert("Submitted!");
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      <input type="text" placeholder="Client Name" required onChange={e => setFormData({...formData, clientName: e.target.value})}/>
      <input type="date" required onChange={e => setFormData({...formData, date: e.target.value})}/>
      <input type="number" step="0.01" placeholder="Volume (MWh)" required onChange={e => setFormData({...formData, volume: e.target.value})}/>
      <input type="text" placeholder="Vintage" required onChange={e => setFormData({...formData, vintage: e.target.value})}/>
      <select required onChange={e => setFormData({...formData, technology: e.target.value})}>
        <option>Wind</option><option>Solar</option><option>Hydro</option><option>Other</option>
      </select>
      <select required onChange={e => setFormData({...formData, country: e.target.value})}>
        <option>Any</option><option>Germany</option><option>France</option><option>Spain</option> {/* Add more */}
      </select>
      <input type="number" step="0.01" placeholder="Price (EUR/MWh)" required onChange={e => setFormData({...formData, price: e.target.value})}/>
      <input type="text" placeholder="Comments" onChange={e => setFormData({...formData, comments: e.target.value})}/>
      <button className="col-span-2 bg-blue-600 text-white p-2 rounded" type="submit">Submit</button>
    </form>
  );
}
