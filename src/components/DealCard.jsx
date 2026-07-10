import { Calendar, User, IndianRupee } from 'lucide-react';

export default function DealCard({ deal, onDragStart }) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, deal.id)}
      className="bg-white rounded-lg border border-gray-200 p-4 mb-3 cursor-grab active:cursor-grabbing hover:shadow-md transition"
    >
      <p className="font-medium text-gray-800 text-sm mb-2">{deal.title}</p>
      <p className="text-xs text-gray-500 mb-3">{deal.customerName}</p>

      <div className="flex items-center gap-1 text-emerald-700 font-semibold text-sm mb-2">
        <IndianRupee size={14} />
        {deal.value?.toLocaleString()}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <User size={12} /> {deal.assignedToName || 'Unassigned'}
        </span>
        {deal.expectedCloseDate && (
          <span className="flex items-center gap-1">
            <Calendar size={12} /> {new Date(deal.expectedCloseDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
          </span>
        )}
      </div>
    </div>
  );
}