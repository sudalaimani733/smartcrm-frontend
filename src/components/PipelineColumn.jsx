import DealCard from './DealCard';

const STAGE_CONFIG = {
  NEW: { label: 'New', color: 'bg-slate-100 text-slate-700', dot: 'bg-slate-400' },
  PROPOSAL: { label: 'Proposal', color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-400' },
  NEGOTIATION: { label: 'Negotiation', color: 'bg-amber-100 text-amber-700', dot: 'bg-amber-400' },
  WON: { label: 'Won', color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-400' },
  LOST: { label: 'Lost', color: 'bg-red-100 text-red-700', dot: 'bg-red-400' },
};

export default function PipelineColumn({ stage, deals, onDragStart, onDragOver, onDrop }) {
  const config = STAGE_CONFIG[stage];
  const totalValue = deals.reduce((sum, d) => sum + (d.value || 0), 0);

  return (
    <div
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, stage)}
      className="flex-1 min-w-[260px] bg-gray-50 rounded-xl p-3"
    >
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${config.dot}`}></span>
          <span className="font-semibold text-sm text-gray-700">{config.label}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${config.color}`}>{deals.length}</span>
        </div>
      </div>
      <p className="text-xs text-gray-400 px-1 mb-3">₹{totalValue.toLocaleString()}</p>

      <div className="min-h-[400px]">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} onDragStart={onDragStart} />
        ))}
        {deals.length === 0 && (
          <div className="text-center text-gray-300 text-xs py-8 border-2 border-dashed border-gray-200 rounded-lg">
            Drop deals here
          </div>
        )}
      </div>
    </div>
  );
}