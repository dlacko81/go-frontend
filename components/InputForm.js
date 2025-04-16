import { useState } from "react";

function InputForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    clientName: "",
    date: "",
    volume: "",
    vintage: "",
    technology: "",
    country: "",
    price: "",
    comments: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} placeholder="Client Name" />
      <input type="date" name="date" value={formData.date} onChange={handleChange} />
      <input type="number" name="volume" value={formData.volume} onChange={handleChange} placeholder="Volume (MWh)" />
      <input type="number" name="vintage" value={formData.vintage} onChange={handleChange} placeholder="Vintage (Year)" />
      <select name="technology" value={formData.technology} onChange={handleChange}>
        <option value="Wind">Wind</option>
        <option value="Solar">Solar</option>
        <option value="Hydro">Hydro</option>
        <option value="Other">Other</option>
      </select>
      <select name="country" value={formData.country} onChange={handleChange}>
        <option value="Any">Any</option>
        <option value="Germany">Germany</option>
        <option value="France">France</option>
        <option value="Italy">Italy</option>
        {/* Add more countries */}
      </select>
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price (EUR/MWh)" />
      <textarea name="comments" value={formData.comments} onChange={handleChange} placeholder="Comments"></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}

export default InputForm;
