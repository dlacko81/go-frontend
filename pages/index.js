import { useState } from "react";
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
