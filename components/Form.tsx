import { useState } from 'react';

export default function Form() {
  const [form, setForm] = useState({
    clientName: '', date: '', volume: '', vintage: '', technology: '',
    country: '', price: '', comments: ''
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Post to backend if endpoint is set up
    alert('Form submitted (hook to backend later)');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.keys(form).map((key) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700 capitalize">{key}</label>
          <input name={key} value={(form as any)[key]} onChange={handleChange}
                 className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        </div>
      ))}
      <button type="submit" className="md:col-span-2 bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}