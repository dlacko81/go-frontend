import Form from "@/components/Form";
import Table from "@/components/Table";
import Stats from "@/components/Stats";

export default async function Home() {
  return (
    <main className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Transaction Input</h1>
      <Form />
      <Stats />
      <Table />
    </main>
  );
}
