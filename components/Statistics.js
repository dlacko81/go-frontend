function Statistics({ data }) {
  if (!data || data.length === 0) return <p>No data available</p>;

  // Get column indexes (assumes specific column structure)
  const CLIENT_NAME_IDX = 0;
  const VOLUME_IDX = 2;
  const PRICE_IDX = 6;

  // Aggregate volume per client
  const volumeByClient = {};

  data.forEach((row) => {
    const client = row[CLIENT_NAME_IDX];
    const volume = parseFloat(row[VOLUME_IDX]) || 0;

    if (volumeByClient[client]) {
      volumeByClient[client] += volume;
    } else {
      volumeByClient[client] = volume;
    }
  });

  // Calculate average price
  const prices = data.map((row) => parseFloat(row[PRICE_IDX])).filter((p) => !isNaN(p));
  const averagePrice = prices.reduce((acc, p) => acc + p, 0) / (prices.length || 1);

  return (
    <div>
      <h2>Statistics</h2>
      <p>Average Price (EUR/MWh): {averagePrice.toFixed(2)}</p>

      <h3>Aggregated Volume per Client</h3>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Client</th>
            <th>Total Volume (MWh)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(volumeByClient).map(([client, totalVolume]) => (
            <tr key={client}>
              <td>{client}</td>
              <td>{totalVolume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Statistics;
