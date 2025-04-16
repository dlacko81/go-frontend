export async function fetchSheetData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}
