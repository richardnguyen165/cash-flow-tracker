import ClientSidebar from "../../components/sidebar/ClientSideBar";
import MainLayout from "../../layout/MainLayout";
import { clientNav } from "../../config/workspaceNav";

const defaultAgreements = [
    ["Capital Advisory Master Agreement", "Active", "Jan 12, 2024"],
    ["Venture Capital Rider", "Pending Signature", "Pending"],
    ["Trust & Estate Planning Services", "Completed", "Jun 04, 2023"],
];

function Contracts({
  sidebar = <ClientSidebar />,
  navItems = clientNav,
  brandLink = "/dashboard",
  eyebrow = "Repository",
  title = "My Contracts",
  description = "Centralize active agreements, pending signatures, and the commitments that drive billing and payment activity.",
  summaryCards = [
    ["Active Engagements", "04", "+1 this month"],
    ["Awaiting Signature", "01", "Action required"],
    ["Annual Commitment", "$412.5K", "Current total"],
  ],
  agreements = defaultAgreements,
  tableTitle = "Current Agreements",
  columns = ["Contract Name", "Status", "Effective Date"],
}) {
  return (
    <MainLayout sidebar={sidebar} navItems={navItems} brandLink={brandLink}>
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b5cf6]">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[#0f172a]">
          {title}
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-[#64748b]">
          {description}
        </p>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {summaryCards.map(([cardTitle, value, subtitle]) => (
          <SummaryCard
            key={cardTitle}
            title={cardTitle}
            value={value}
            subtitle={subtitle}
          />
        ))}
      </section>

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
              {agreements.map((row) => (
                <tr key={row[0]} className="text-sm text-[#0f172a]">
                  {row.map((cell, index) => (
                    <td
                      key={`${row[0]}-${index}`}
                      className={`px-6 py-5 ${index === 0 ? "font-medium" : "text-[#475569]"}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
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
