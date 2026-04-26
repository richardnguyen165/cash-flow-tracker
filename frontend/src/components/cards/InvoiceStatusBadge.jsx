function InvoiceStatusBadge({ status }) {
  const styles = {
    Overdue: "bg-red-100 text-red-700",
    Unpaid: "bg-yellow-100 text-yellow-700",
    Paid: "bg-green-100 text-green-700",
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

export default InvoiceStatusBadge;