import React, { useState, useEffect } from "react";

// List of EU countries for dropdown
const countries = [
  "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
  "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary",
  "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta",
  "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia",
  "Spain", "Sweden"
];

const InputForm = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    transactionDate: "",
    volume: "",
    vintage: "",
    technology: "",
    country: "",
    price: "",
    comments: "",
  });

  const [status, setStatus] = useState("");
  const [entries, setEntries] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const response = await fetch("https://go-backend-1-lxgb.onrender.com/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setStatus("✅ Submitted successfully!");
      setFormData({
        clientName: "",
        transactionDate: "",
        volume: "",
        vintage: "",
        technology: "",
        country: "",
        price: "",
        comments: "",
      });

      fetchData(); // Refresh table
    } catch (error) {
      console.error("Submission error:", error);
      setStatus(`❌ Error: ${error.message}`);
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch("https://go-backend-1-lxgb.onrender.com/api/data");
      const data = await res.json();
      setEntries(data);
    } catch (error) {
      console.error("Fetching error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Submit New Entry</h2>
        <input
          name="clientName"
          placeholder="Client Name"
          value={formData.clientName}
          onChange={handleChange}
          required
        />
        <input
          name="transactionDate"
          type="date"
          value={formData.transactionDate}
          onChange={handleChange}
          required
        />
        <input
          name="volume"
          placeholder="Volume (MWh)"
          type="number"
          value={formData.volume}
          onChange={handleChange}
        />
        <input
          name="vintage"
          placeholder="Vintage (Year)"
          type="number"
          value={formData.vintage}
          onChange={handleChange}
        />
        <select
          name="technology"
          value={formData.technology}
          onChange={handleChange}
        >
          <option value="">Select Technology</option>
          <option>Wind</option>
          <option>Solar</option>
          <option>Hydro</option>
          <option>Any</option>
          <option>Other</option>
        </select>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
        >
          <option value="">Select Country</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input
          name="price"
          placeholder="Price (EUR)"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
        />
        <textarea
          name="comments"
          placeholder="Comments"
          value={formData.comments}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
        <p>{status}</p>
      </form>

      <hr />

      <h2>Submitted Entries</h2>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Date</th>
            <th>Volume (MWh)</th>
            <th>Vintage</th>
            <th>Technology</th>
            <th>Country</th>
            <th>Price (EUR)</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {entries.length > 0 ? (
            entries.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr><td colSpan="8">No data yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InputForm;
