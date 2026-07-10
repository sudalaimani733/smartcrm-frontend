import { useState } from 'react';

const SOURCES = ['WEBSITE', 'REFERRAL', 'COLD_CALL', 'SOCIAL_MEDIA', 'OTHER'];

export default function LeadForm({ customers, users, onSubmit, onCancel }) {
  const [form, setForm] = useState({ customerId: '', source: 'WEBSITE', assignedToId: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, assignedToId: form.assignedToId || null });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700">Customer</label>
        <select
          required
          value={form.customerId}
          onChange={(e) => setForm({ ...form, customerId: e.target.value })}
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
        >
          <option value="">Select customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Source</label>
        <select
          value={form.source}
          onChange={(e) => setForm({ ...form, source: e.target.value })}
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
        >
          {SOURCES.map((s) => (
            <option key={s} value={s}>{s.replace('_', ' ')}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Assign To</label>
        <select
          value={form.assignedToId}
          onChange={(e) => setForm({ ...form, assignedToId: e.target.value })}
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
        >
          <option value="">Unassigned</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">
          Cancel
        </button>
        <button type="submit" className="flex-1 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700">
          Create Lead
        </button>
      </div>
    </form>
  );
}