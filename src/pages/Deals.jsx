import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import DealForm from '../components/DealForm';
import PipelineColumn from '../components/PipelineColumn';
import { getPipeline, createDeal, updateDealStage } from '../api/dealApi';
import { getAllCustomers } from '../api/customerApi';
import { getAllUsers } from '../api/userApi';
import { Plus } from 'lucide-react';

const STAGES = ['NEW', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST'];

export default function Deals() {
  const [pipeline, setPipeline] = useState({});
  const [customers, setCustomers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [draggedDealId, setDraggedDealId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [pipelineRes, custRes, userRes] = await Promise.all([
        getPipeline(), getAllCustomers(), getAllUsers(),
      ]);
      setPipeline(pipelineRes.data);
      setCustomers(custRes.data);
      setUsers(userRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      await createDeal(formData);
      setModalOpen(false);
      loadData();
    } catch (err) {
      alert('Failed to create deal');
    }
  };

  const handleDragStart = (e, dealId) => {
    setDraggedDealId(dealId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, newStage) => {
    e.preventDefault();
    if (!draggedDealId) return;

    try {
      await updateDealStage(draggedDealId, newStage);
      setDraggedDealId(null);
      loadData();
    } catch (err) {
      alert('Failed to update deal stage');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-gray-500">Loading pipeline...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Deal Pipeline</h1>
          <p className="text-gray-500 mt-1">Drag deals between stages to update progress</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary-700"
        >
          <Plus size={18} /> Add Deal
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => (
          <PipelineColumn
            key={stage}
            stage={stage}
            deals={pipeline[stage] || []}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Deal">
        <DealForm customers={customers} users={users} onSubmit={handleCreate} onCancel={() => setModalOpen(false)} />
      </Modal>
    </Layout>
  );
}