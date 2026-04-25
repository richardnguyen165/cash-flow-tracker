import StatusBadge from "./StatusBadge";

function ContractsCard({
  title = "My Contracts",
  subtitle,
  contracts = [],
  columns = ["Agreement", "Due Date", "Amount", "Status"],
  onRowClick,
  actionButton,
}) {
  return (
    <section className="mt-8 rounded-4xl border border-[#e7edf5] bg-white p-8 shadow-[0_16px_45px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#0f172a]">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-[#64748b]">
              {subtitle}
            </p>
          )}
        </div>

        {actionButton}
      </div>

      <div className="mt-6 overflow-hidden rounded-[28px] border border-[#eef2f6]">
        <table className="min-w-full divide-y divide-[#eef2f6]">
          <thead className="bg-[#f8fafc]">
            <tr className="text-left text-xs uppercase tracking-[0.18em] text-[#94a3b8]">
              {columns.map((column) => (
                <th key={column} className="px-6 py-4 font-semibold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#eef2f6] bg-white">
            {contracts.map((contract) => (
              <tr
                key={contract.agreementId || contract.name}
                onClick={() => onRowClick?.(contract)}
                className={`text-sm text-[#0f172a] transition ${
                  onRowClick ? "cursor-pointer hover:bg-[#f8fafc]" : ""
                }`}
              >
                <td className="px-6 py-6 font-semibold">{contract.name}</td>
                <td className="px-6 py-6 text-[#475569]">{contract.dueDate}</td>
                <td className="px-6 py-6 font-semibold">{contract.amount}</td>
                <td className="px-6 py-6">
                  <StatusBadge status={contract.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ContractsCard;