import BusinessSideBar from "../../components/sidebar/BusinessSideBar";
import MainLayout from "../../layout/MainLayout";
import MetricCard from "../../components/cards/MetricCard";
import { businessAdminNav } from "../../config/workspaceNav";

function BusinessDashboard() {
  const contracts = [
    ["Capital Management Agreement", "Northshire Capital Inc.", "May 23, 2025", "$398,000", "Active"],
    ["Budgeting Agreement", "Northshire Capital Inc.", "Aug 30, 2025", "$180,000", "Active"],
    ["Forecasting Clause", "Stratford Services Corp.", "Aug 30, 2026", "$159,000", "Pending"],
  ];

  return (
    <MainLayout
      sidebar={<BusinessSideBar />}
      navItems={businessAdminNav}
      brandLink="/business/dashboard"
    >
      <section>
        <h1 className="text-5xl font-semibold tracking-tight text-black">Overview</h1>
        <p className="mt-3 max-w-3xl text-lg text-[#4b5563]">
          Monitor outstanding balances, current agreements, employee activity, and
          business-wide billing status from one workspace.
        </p>
      </section>

      {/* <section className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-[28px] border border-[#efeafc] bg-[#f6efff] p-8 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6b7280]">
            Total Outstanding Balance
          </p>
          <h2 className="mt-5 text-6xl font-semibold tracking-tight text-black">
            $2,400,000.00
          </h2>
          <button className="mt-8 rounded-2xl bg-[#111827] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black">
            Pay Outstanding
          </button>
        </div>

        <div className="rounded-[28px] border border-[#ececf2] bg-white p-8 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6b7280]">
            Team Activity
          </p>
          <h3 className="mt-4 text-4xl font-semibold tracking-tight text-[#8b5cf6]">
            09
          </h3>
          <p className="mt-3 text-sm text-[#4b5563]">
            Employees currently assigned to expenses, invoices, or contract work.
          </p>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <MetricCard label="Active Contracts" value="12" subtitle="Current client agreements" compact />
        <MetricCard label="Pending Invoices" value="07" subtitle="Awaiting review or settlement" compact />
        <MetricCard label="Scheduled Expenses" value="$58.2K" subtitle="Payroll, recurring costs, and pay-offs" compact accent="text-[#8b5cf6]" />
      </section> */}

      {/* <section className="mt-8 rounded-[32px] border border-[#e7edf5] bg-white p-8 shadow-[0_16px_45px_rgba(15,23,42,0.04)]">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-[#0f172a]">
            Business Contracts (Top 3)
          </h2>
          <button className="rounded-2xl bg-[#111827] px-5 py-3 text-sm font-semibold text-white transition hover:bg-black">
            New Contract
          </button>
        </div>
        <div className="mt-6 overflow-hidden rounded-[28px] border border-[#eef2f6]">
          <table className="min-w-full divide-y divide-[#eef2f6]">
            <thead className="bg-[#f8fafc]">
              <tr className="text-left text-xs uppercase tracking-[0.18em] text-[#94a3b8]">
                {["Contract", "Counterparty", "Effective Date", "Value", "Status"].map((header) => (
                  <th key={header} className="px-6 py-4 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef2f6] bg-white">
              {contracts.map((row) => (
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
      </section> */}
    </MainLayout>
  );
}

export default BusinessDashboard;
