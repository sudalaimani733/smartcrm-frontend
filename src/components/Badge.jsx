const SCORE_STYLES = {
  HOT: 'bg-red-100 text-red-700 border-red-200',
  WARM: 'bg-amber-100 text-amber-700 border-amber-200',
  COLD: 'bg-blue-100 text-blue-700 border-blue-200',
};

const STATUS_STYLES = {
  NEW: 'bg-gray-100 text-gray-700 border-gray-200',
  CONTACTED: 'bg-purple-100 text-purple-700 border-purple-200',
  QUALIFIED: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  CONVERTED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  LOST: 'bg-red-100 text-red-700 border-red-200',
};

export function ScoreBadge({ score }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${SCORE_STYLES[score] || SCORE_STYLES.COLD}`}>
      {score === 'HOT' && '🔥 '}
      {score}
    </span>
  );
}

export function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${STATUS_STYLES[status] || STATUS_STYLES.NEW}`}>
      {status}
    </span>
  );
}