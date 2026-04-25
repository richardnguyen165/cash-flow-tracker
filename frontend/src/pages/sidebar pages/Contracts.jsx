import { useState } from "react";
import ContractDetailsModal from "../../modals/ContractDetailsModal";
import ClientSidebar from "../../components/sidebar/ClientSideBar";
import MainLayout from "../../layout/MainLayout";
import { clientNav } from "../../config/workspaceNav";
import decodeTokens from "../../services/decode-tokens";

const defaultAgreements = [
  {
    name: "Capital Advisory Master Agreement",
    nextAction: "Awaiting billing approval",
    dueDate: "Apr 22, 2026",
    amount: "$84,210.00",
    status: "In Review",
    description:
      "This Master Agreement sets forth the terms and conditions under which Northshore Capital will provide advisory, financial planning, and account management services to the client. The agreement outlines the scope of advisory work, billing expectations, approval procedures, reporting obligations, and the responsibilities of both parties during the contract period. It also defines how invoices, client communications, payment adjustments, outstanding balances, and service changes will be handled. Any amendments, renewals, or modifications to this agreement must be reviewed and approved by the appropriate parties before becoming effective.",
    agreementId: "TR-8842-AXL-001",
  },
  {
    name: "Equity Participation Clause",
    nextAction: "Pending client signature",
    dueDate: "Apr 25, 2026",
    amount: "$250,000.00",
    status: "Pending Signature",
    description:
      "This Equity Participation Clause describes the terms under which the client may participate in an equity-based financial arrangement with the business. The clause defines ownership expectations, approval requirements, payment obligations, vesting or participation conditions, and the responsibilities of each party before the agreement becomes active. It also explains how changes to the participation structure, missed approvals, incomplete documentation, or delayed signatures may affect the enforceability of the clause. This contract will not be considered fully executed until all required parties have reviewed, approved, and signed the final agreement.",
    agreementId: "TR-8842-AXL-002",
  },
  {
    name: "Commercial Escrow Agreement",
    nextAction: "Payment scheduled",
    dueDate: "Apr 30, 2026",
    amount: "$42,500.00",
    status: "Scheduled",
    description:
      "This Commercial Escrow Agreement establishes the terms under which funds will be held, released, and documented during the transaction between the business and the client. The agreement outlines the escrow amount, scheduled payment timing, release conditions, client obligations, business responsibilities, and documentation required before funds may be transferred. It also describes how delays, disputes, incomplete payments, or changes to the transaction may be managed. All parties agree that the escrowed funds must be handled according to the stated conditions and may only be released once the required approvals and contractual obligations have been satisfied.",
    agreementId: "TR-8842-AXL-003",
  },
];

function StatusBadge({ status }) {
  const styles = {
    "In Review": "bg-yellow-100 text-yellow-700",
    "Pending Signature": "bg-red-100 text-red-700",
    Scheduled: "bg-purple-100 text-purple-700",
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

function Contracts({
  sidebar = <ClientSidebar />,
  navItems = clientNav,
  brandLink = "/dashboard",
  agreements = defaultAgreements,
  tableTitle = "Current Agreements",
  columns = ["Agreement", "Next Action", "Due Date", "Amount", "Status"],
}) {
  const [selectedContract, setSelectedContract] = useState(null);

  return (
    <MainLayout sidebar={sidebar} navItems={navItems} brandLink={brandLink}>
      {/* keep your top sections the same */}

      <section className="mt-8 rounded-[32px] border border-[#e7edf5] bg-white p-8 shadow-[0_16px_45px_rgba(15,23,42,0.04)]">
        <h2 className="text-2xl font-semibold tracking-tight text-[#0f172a]">
          {tableTitle}
        </h2>

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
              {agreements.map((contract) => (
                <tr
                  key={contract.name}
                  onClick={() =>
                    setSelectedContract({
                      ...contract,
                      date: contract.dueDate,
                      authMethod: "Digital Signature",
                    })
                  }
                  className="cursor-pointer text-sm text-[#0f172a] transition hover:bg-[#f8fafc]"
                >
                  <td className="px-6 py-6 font-semibold">{contract.name}</td>
                  <td className="px-6 py-6 text-[#475569]">
                    {contract.nextAction}
                  </td>
                  <td className="px-6 py-6 text-[#475569]">
                    {contract.dueDate}
                  </td>
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

      <ContractDetailsModal
        isOpen={!!selectedContract}
        onClose={() => setSelectedContract(null)}
        contract={selectedContract}
      />
    </MainLayout>
  );
}

function SummaryCard({ title, value, subtitle }) {
  return (
    <div className="rounded-[28px] border border-[#e7edf5] bg-white p-7 shadow-[0_12px_35px_rgba(15,23,42,0.04)]">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#94a3b8]">
        {title}
      </p>
      <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#0f172a]">
        {value}
      </h2>
      <p className="mt-3 text-sm text-[#64748b]">{subtitle}</p>
    </div>
  );
}

export default Contracts;
