function DataTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Client Name</th>
          <th>Date</th>
          <th>Client Direction</th>
          <th>Volume</th>
          <th>Vintage</th>
          <th>Technology</th>
          <th>Country</th>
          <th>Price</th>
          <th>Comments</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.clientName}</td>
            <td>{row.date}</td>
            <td>{row.clientDirection}</td>
            <td>{row.volume}</td>
            <td>{row.vintage}</td>
            <td>{row.technology}</td>
            <td>{row.country}</td>
            <td>{row.price}</td>
            <td>{row.comments}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
