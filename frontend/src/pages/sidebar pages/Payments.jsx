import ClientSidebar from "../../components/sidebar/ClientSideBar";
import MainLayout from "../../layout/MainLayout";
import { clientNav } from "../../config/workspaceNav";

const defaultTransactions = [
    ["Sep 28, 2023", "Invoice #8821 Payment", "Wire Transfer", "+$12,400.00"],
    ["Sep 15, 2023", "Invoice #8792 Payment", "Amex **** 1002", "+$8,500.00"],
    ["Sep 04, 2023", "Deposit - Asset Reallocation", "Digital Secure", "+$50,000.00"],
];

function Payments({
  sidebar = <ClientSidebar />,
  navItems = clientNav,
  brandLink = "/dashboard",
  eyebrow = "Settlement",
  title = "Payments",
  description = "Review recent payment activity, upcoming due dates, and the channels being used to settle outstanding balances.",
  totalOutstanding = "$42,850.00",
  nextDueDate = "Oct 12, 2023",
  lastPayment = "$12,400.00",
  actionTitle = "Make a Payment",
  actionCopy = "Use your saved method or initiate a transfer to clear the next due invoice.",
  actionButton = "Open Payment Modal",
  transactions = defaultTransactions,
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

      <section className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-[28px] border border-[#e7edf5] bg-white p-8 shadow-[0_16px_45px_rgba(15,23,42,0.04)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#94a3b8]">
            Total Outstanding
          </p>
          <h2 className="mt-5 text-5xl font-semibold tracking-tight text-[#0f172a]">
            {totalOutstanding}
          </h2>
          <div className="mt-6 flex gap-10 text-sm text-[#475569]">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#94a3b8]">
                Next Due Date
              </p>
              <p className="mt-2 font-semibold text-[#0f172a]">{nextDueDate}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#94a3b8]">
                Last Payment
              </p>
              <p className="mt-2 font-semibold text-[#0f172a]">{lastPayment}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] bg-[#1f2937] p-8 text-white shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d8b4fe]">
            Quick Action
          </p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight">
            {actionTitle}
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#d6e4ef]">
            {actionCopy}
          </p>
          <button className="mt-8 w-full rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#f4f7fb]">
            {actionButton}
          </button>
        </div>
      </section>

      <section className="mt-8 rounded-[32px] border border-[#e7edf5] bg-white p-8 shadow-[0_16px_45px_rgba(15,23,42,0.04)]">
        <h2 className="text-2xl font-semibold tracking-tight text-[#0f172a]">
          Recent Transactions
        </h2>
        <div className="mt-6 overflow-hidden rounded-[28px] border border-[#eef2f6]">
          <table className="min-w-full divide-y divide-[#eef2f6]">
            <thead className="bg-[#f8fafc]">
              <tr className="text-left text-xs uppercase tracking-[0.18em] text-[#94a3b8]">
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Description</th>
                <th className="px-6 py-4 font-semibold">Method</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef2f6] bg-white">
              {transactions.map(([date, description, method, amount]) => (
                <tr key={`${date}-${description}`} className="text-sm text-[#0f172a]">
                  <td className="px-6 py-5 text-[#475569]">{date}</td>
                  <td className="px-6 py-5 font-medium">{description}</td>
                  <td className="px-6 py-5 text-[#475569]">{method}</td>
                  <td className="px-6 py-5 font-semibold text-[#8b5cf6]">
                    {amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </MainLayout>
  );
}

export default Payments;
