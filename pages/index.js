import { useState } from "react";

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]); // state to hold your fetched data

  const handleLogin = () => {
    if (password === "yourpassword") {
      setAuthenticated(true);
    } else {
      alert("Wrong password");
    }
  };

  // Fetch data once logged in
  const fetchData = async () => {
    const response = await fetch("/api/data"); // assuming your API is set up
    const result = await response.json();
    setData(result);
  };

  // Display login form if not authenticated
  if (!authenticated) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Enter Password to Access</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '8px', margin: '10px' }}
        />
        <button onClick={handleLogin}>Submit</button>
      </div>
    );
  }


import Header from "../components/Header";
import InputForm from "../components/InputForm";
import DataTable from "../components/DataTable";
import Statistics from "../components/Statistics";

export default function Home() {
  const [data, setData] = useState([]);

  const handleFormSubmit = (formData) => {
    setData([...data, formData]);
  };

  return (
    <div>
      <Header />
      <InputForm onSubmit={handleFormSubmit} />
      <Statistics data={data} />
      <DataTable data={data} />
    </div>
  );
}
