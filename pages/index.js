import { useState } from "react";
import Header from "../components/Header";
import InputForm from "../components/InputForm";
import DataTable from "../components/DataTable";
import Statistics from "../components/Statistics";

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);

  const handleLogin = () => {
    if (password === "PassWord") {
      setAuthenticated(true);
    } else {
      alert("Wrong password");
    }
  };

export default function Home({ data }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <Statistics data={data} />
    </div>
  );
}

  const handleFormSubmit = (formData) => {
    setData([...data, formData]);
  };

  if (!authenticated) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Enter Password to Access</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "8px", margin: "10px" }}
        />
        <button onClick={handleLogin}>Submit</button>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <InputForm onSubmit={handleFormSubmit} />
      <Statistics data={data} />
      <DataTable data={data} />
    </div>
  );
}
