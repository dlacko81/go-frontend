import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function DataTable() {
  const { data, error } = useSWR('/api/data', fetcher);

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="overflow-x-auto bg-white p-4 rounded shadow">
      <table className="min-w-full text-sm text-left border">
        <thead className="bg-gray-200">
          <tr>
            {data.data[0].map((header: any, i: number) => (
              <th key={i} className="px-2 py-1 border">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.data.slice(1).map((row: any, i: number) => (
            <tr key={i} className="border-t">
              {row.map((cell: any, j: number) => (
                <td key={j} className="px-2 py-1 border">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}