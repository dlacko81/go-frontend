'use client';

import { useEffect, useState } from "react";

export default function Table() {
  const [data, setData] = useState<any[][]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/data`)
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <table className="table-auto w-full border mt-8">
      <thead>
        <tr>
          {data[0]?.map((header, idx) => (
            <th key={idx} className="border px-2 py-1">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.slice(1).map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j} className="border px-2 py-1">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
