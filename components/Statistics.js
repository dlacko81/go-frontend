import React from "react";

function Statistics({ data }) {
  if (!data || data.length === 0) return <p>No data available</p>;

  // Define indexes based on your data structure
  const CLIENT_NAME_IDX = 0; // Client Name is in the first column
  const VOLUME_IDX = 2; // Volume is in the third column (index 2)
  const PRICE_IDX = 6; // Price is in the seventh column (index 6)

  // Aggregate volume per client
  const volumeByClient = {};

  data.forEach((row) => {
    const client = row[CLIENT_NAME_IDX];
    const volume = parseFloat(row[VOLUME_IDX]) || 0;

    // Sum up the volumes for each client
    if (volumeByClient[client]) {
      volumeByClient[client] += volume;
    } else {
      volumeByClient[client] = volume;
    }
  });

  // Calculate the average price
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
          {/* Render each client and their aggregated volume */}
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
