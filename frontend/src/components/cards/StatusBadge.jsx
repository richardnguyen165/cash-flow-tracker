// This status badge is for contract card***

function StatusBadge({ status }) {
  const styles = {
    "In Review": "bg-yellow-100 text-yellow-700",
    Active: "bg-green-100 text-green-700",
    Completed: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;