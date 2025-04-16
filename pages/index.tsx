import Head from 'next/head';
import Form from '../components/Form';
import DataTable from '../components/DataTable';
import Stats from '../components/Stats';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Head>
        <title>Energy Transactions Dashboard</title>
      </Head>
      <h1 className="text-3xl font-bold mb-6">Energy Transactions</h1>
      <Form />
      <Stats />
      <DataTable />
    </div>
  );
}