import { useState } from 'react';

export default function ConvertLeadForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({ title: '', value: '', expectedCloseDate: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, value: parseFloat(form.value) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700">Deal Title</label>
        <input
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="e.g. Ravi Traders - Bulk Order"
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Deal Value (₹)</label>
        <input
          type="number"
          required
          value={form.value}
          onChange={(e) => setForm({ ...form, value: e.target.value })}
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Expected Close Date</label>
        <input
          type="date"
          required
          value={form.expectedCloseDate}
          onChange={(e) => setForm({ ...form, expectedCloseDate: e.target.value })}
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
        />
      </div>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">
          Cancel
        </button>
        <button type="submit" className="flex-1 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700">
          Convert to Deal
        </button>
      </div>
    </form>
  );
}