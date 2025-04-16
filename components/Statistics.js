function Statistics({ data }) {
  // Sample calculation of average price, you can extend this with more stats
  const averagePrice = data.reduce((acc, row) => acc + parseFloat(row.price || 0), 0) / data.length;

  return (
    <div>
      <h2>Statistics</h2>
      <p>Average Price (EUR/MWh): {averagePrice.toFixed(2)}</p>
    </div>
  );
}

export default Statistics;
