import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import { getDashboardSummary, getPipelineValue, getConversionRate, getRepPerformance } from '../api/dashboardApi';
import { Users, Target, Briefcase, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const STAGE_COLORS = {
  NEW: '#94a3b8',
  PROPOSAL: '#60a5fa',
  NEGOTIATION: '#fbbf24',
  WON: '#34d399',
  LOST: '#f87171',
};

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [pipelineValue, setPipelineValue] = useState({});
  const [conversionRate, setConversionRate] = useState(0);
  const [repPerformance, setRepPerformance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [summaryRes, pipelineRes, conversionRes, repRes] = await Promise.all([
        getDashboardSummary(),
        getPipelineValue(),
        getConversionRate(),
        getRepPerformance(),
      ]);
      setSummary(summaryRes.data);
      setPipelineValue(pipelineRes.data);
      setConversionRate(conversionRes.data);
      setRepPerformance(repRes.data);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  const pipelineChartData = Object.entries(pipelineValue).map(([stage, value]) => ({
    stage,
    value,
  }));

  if (loading) {
    return (
      <Layout>
        <div className="text-gray-500">Loading dashboard...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your sales pipeline</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Customers" value={summary.totalCustomers} icon={Users} color="bg-blue-500" />
        <StatCard title="Total Leads" value={summary.totalLeads} icon={Target} color="bg-purple-500" />
        <StatCard title="Open Deals" value={summary.openDeals} icon={Briefcase} color="bg-amber-500" />
        <StatCard title="Conversion Rate" value={`${conversionRate.toFixed(1)}%`} icon={TrendingUp} color="bg-emerald-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pipeline Value Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Pipeline Value by Stage</h3>
          {pipelineChartData.length === 0 ? (
            <p className="text-gray-400 text-sm">No deals yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={pipelineChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="stage" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {pipelineChartData.map((entry, index) => (
                    <Cell key={index} fill={STAGE_COLORS[entry.stage] || '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Deal Stage Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Deal Distribution</h3>
          {pipelineChartData.length === 0 ? (
            <p className="text-gray-400 text-sm">No deals yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={pipelineChartData}
                  dataKey="value"
                  nameKey="stage"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={(entry) => entry.stage}
                >
                  {pipelineChartData.map((entry, index) => (
                    <Cell key={index} fill={STAGE_COLORS[entry.stage] || '#3b82f6'} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Rep Performance Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Sales Rep Performance</h3>
        {repPerformance.length === 0 ? (
          <p className="text-gray-400 text-sm">No sales reps found</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-200">
                <th className="pb-3 font-medium">Rep Name</th>
                <th className="pb-3 font-medium">Deals Won</th>
                <th className="pb-3 font-medium">Total Value Won</th>
              </tr>
            </thead>
            <tbody>
              {repPerformance.map((rep) => (
                <tr key={rep.userId} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 text-gray-800 font-medium">{rep.userName}</td>
                  <td className="py-3 text-gray-600">{rep.dealsWon}</td>
                  <td className="py-3 text-gray-600">₹{rep.totalValueWon?.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}