import ClientSidebar from "../../components/sidebar/ClientSideBar";
import MainLayout from "../../layout/MainLayout";
import { clientNav } from "../../config/workspaceNav";

const defaultInvoices = [
    ["INV-8929", "Oct 01, 2023", "$18,200.00", "Overdue"],
    ["INV-8714", "Sep 28, 2023", "$6,250.00", "Unpaid"],
    ["INV-8650", "Sep 15, 2023", "$12,000.00", "Paid"],
];

function Invoices({
  sidebar = <ClientSidebar />,
  navItems = clientNav,
  brandLink = "/dashboard",
  eyebrow = "Billing",
  title = "Invoices",
  description = "Review invoice history, pending approval items, and the balances that still need to be settled.",
  summaryCards = [
    ["Total Outstanding", "$24,450.00", "Across all open invoices"],
    ["Pending Review", "02", "Waiting on approval"],
    ["Last Paid", "$12,000.00", "Settled Sep 15, 2023"],
  ],
  invoices = defaultInvoices,
  tableTitle = "Billing History",
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
                <th className="px-6 py-4 font-semibold">Invoice ID</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef2f6] bg-white">
              {invoices.map(([id, date, amount, status]) => (
                <tr key={id} className="text-sm text-[#0f172a]">
                  <td className="px-6 py-5 font-medium">{id}</td>
                  <td className="px-6 py-5 text-[#475569]">{date}</td>
                  <td className="px-6 py-5 font-semibold">{amount}</td>
                  <td className="px-6 py-5 text-[#475569]">{status}</td>
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

export default Invoices;
