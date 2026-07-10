import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import LeadForm from '../components/LeadForm';
import ConvertLeadForm from '../components/ConvertLeadForm';
import { ScoreBadge, StatusBadge } from '../components/Badge';
import { getAllLeads, createLead, filterLeads, deleteLead } from '../api/leadApi';
import { getAllCustomers } from '../api/customerApi';
import { getAllUsers } from '../api/userApi';
import { convertLeadToDeal } from '../api/dealApi';
import { Plus, Phone, Trash2, ArrowRightCircle } from 'lucide-react';

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [convertModalOpen, setConvertModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [scoreFilter, setScoreFilter] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [leadRes, custRes, userRes] = await Promise.all([
        getAllLeads(), getAllCustomers(), getAllUsers(),
      ]);
      setLeads(leadRes.data);
      setCustomers(custRes.data);
      setUsers(userRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (score) => {
    setScoreFilter(score);
    if (score === '') {
      loadData();
      return;
    }
    const res = await filterLeads(null, score);
    setLeads(res.data);
  };

  const handleCreate = async (formData) => {
    try {
      await createLead(formData);
      setModalOpen(false);
      loadData();
    } catch (err) {
      alert('Failed to create lead');
    }
  };

  const openConvertModal = (lead) => {
    setSelectedLead(lead);
    setConvertModalOpen(true);
  };

  const handleConvert = async (dealData) => {
    try {
      await convertLeadToDeal(selectedLead.id, dealData);
      setConvertModalOpen(false);
      loadData();
      alert('Lead converted to deal successfully!');
    } catch (err) {
      alert('Failed to convert lead');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this lead?')) return;
    try {
      await deleteLead(id);
      loadData();
    } catch (err) {
      alert('Failed to delete lead');
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Leads</h1>
          <p className="text-gray-500 mt-1">Track and score your incoming leads</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary-700"
        >
          <Plus size={18} /> Add Lead
        </button>
      </div>

      {/* Score Filter Tabs */}
      <div className="flex gap-2 mb-5">
        {['', 'HOT', 'WARM', 'COLD'].map((s) => (
          <button
            key={s}
            onClick={() => handleFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border ${
              scoreFilter === s
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {s === '' ? 'All Leads' : s}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : leads.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No leads found</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-left text-gray-500">
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Source</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Score</th>
                <th className="px-5 py-3 font-medium">Activities</th>
                <th className="px-5 py-3 font-medium">Assigned To</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-800">{lead.customerName}</td>
                  <td className="px-5 py-3 text-gray-600">{lead.source?.replace('_', ' ')}</td>
                  <td className="px-5 py-3"><StatusBadge status={lead.status} /></td>
                  <td className="px-5 py-3"><ScoreBadge score={lead.score} /></td>
                  <td className="px-5 py-3 text-gray-600">
                    <span className="flex items-center gap-1">
                      <Phone size={13} /> {lead.activityCount || 0}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{lead.assignedToName || 'Unassigned'}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2 justify-end">
                      {lead.status !== 'CONVERTED' && (
                        <button
                          onClick={() => openConvertModal(lead)}
                          title="Convert to Deal"
                          className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                        >
                          <ArrowRightCircle size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Lead">
        <LeadForm customers={customers} users={users} onSubmit={handleCreate} onCancel={() => setModalOpen(false)} />
      </Modal>

      <Modal isOpen={convertModalOpen} onClose={() => setConvertModalOpen(false)} title={`Convert Lead: ${selectedLead?.customerName}`}>
        <ConvertLeadForm onSubmit={handleConvert} onCancel={() => setConvertModalOpen(false)} />
      </Modal>
    </Layout>
  );
}