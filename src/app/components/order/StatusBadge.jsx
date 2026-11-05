const STYLES = {
  Delivered: "bg-success-600/10 text-success-600",
  Pending: "bg-accent-500/10 text-accent-600",
  Cancelled: "bg-danger-600/10 text-danger-600",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${STYLES[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}
