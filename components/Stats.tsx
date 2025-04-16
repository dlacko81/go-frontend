'use client';

import { useEffect, useState } from "react";

export default function Stats() {
  const [data, setData] = useState<any[][]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/data`)
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data || data.length < 2) return null;

  const volumeCol = data[0].indexOf("Volume (MWh)");
  const priceCol = data[0].indexOf("Price (EUR/MWh)");
  const totalVolume = data.slice(1).reduce((sum, row) => sum + parseFloat(row[volumeCol] || 0), 0);
  const avgPrice = data.slice(1).reduce((sum, row) => sum + parseFloat(row[priceCol] || 0), 0) / (data.length - 1);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 border rounded">Total Volume: <strong>{totalVolume.toFixed(2)} MWh</strong></div>
      <div className="p-4 border rounded">Avg. Price: <strong>{avgPrice.toFixed(2)} EUR/MWh</strong></div>
    </div>
  );
}
