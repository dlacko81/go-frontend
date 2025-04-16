import React, { useState } from "react";

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
    } catch (error) {
      console.error("Submission error:", error);
      setStatus(`❌ Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="clientName"
        placeholder="Client Name"
        value={formData.clientName}
        onChange={handleChange}
        required
      />
      <input
        name="transactionDate"
        placeholder="Transaction Date"
        type="date"
        value={formData.transactionDate}
        onChange={handleChange}
        required
      />
      <input
        name="volume"
        placeholder="Volume"
        value={formData.volume}
        onChange={handleChange}
      />
      <input
        name="vintage"
        placeholder="Vintage"
        value={formData.vintage}
        onChange={handleChange}
      />
      <input
        name="technology"
        placeholder="Technology"
        value={formData.technology}
        onChange={handleChange}
      />
      <input
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
      />
      <input
        name="price"
        placeholder="Price"
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
  );
};

export default InputForm;
