import EmployeeSideBar from "../../components/sidebar/EmployeeSideBar";
import MainLayout from "../../layout/MainLayout";
import MetricCard from "../../components/cards/MetricCard";
import { employeeNav } from "../../config/workspaceNav";

function EmployeeDashboard() {
  const assignments = [
    ["Global Custody Rider", "Log final invoice line items", "Today"],
    ["Forecasting Clause", "Review expense documentation", "Apr 19, 2026"],
    ["Quarterly Portfolio Invoice", "Confirm payment notes", "Apr 22, 2026"],
  ];

  return (
    <MainLayout
      sidebar={<EmployeeSideBar />}
      navItems={employeeNav}
      brandLink="/employee/dashboard"
    >
      <section>
        <h1 className="text-5xl font-semibold tracking-tight text-black">Employee Dashboard</h1>
        <p className="mt-3 max-w-3xl text-lg text-[#4b5563]">
          Keep up with assigned contracts, expense tasks, and wage or payment history linked to your business role.
        </p>
      </section>

      <section className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-[28px] border border-[#efeafc] bg-[#f6efff] p-8 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6b7280]">
            Assigned Work
          </p>
          <h2 className="mt-5 text-6xl font-semibold tracking-tight text-black">
            05
          </h2>
          <p className="mt-4 text-sm text-[#4b5563]">
            Contract, invoice, and expense tasks currently attached to your role.
          </p>
        </div>

        <div className="rounded-[28px] border border-[#ececf2] bg-white p-8 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6b7280]">
            Latest Pay
          </p>
          <h3 className="mt-4 text-4xl font-semibold tracking-tight text-[#8b5cf6]">
            $4,200
          </h3>
          <p className="mt-3 text-sm text-[#4b5563]">
            Most recent wage or reimbursement recorded for your account.
          </p>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <MetricCard label="Expense Tasks" value="03" subtitle="Receipts and approvals to review" compact />
        <MetricCard label="Contracts Assigned" value="04" subtitle="Contracts with action items for you" compact />
        <MetricCard label="Payment History" value="$18.6K" subtitle="Recent wages and reimbursements" compact accent="text-[#8b5cf6]" />
      </section>

      <section className="mt-8 rounded-[32px] border border-[#e7edf5] bg-white p-8 shadow-[0_16px_45px_rgba(15,23,42,0.04)]">
        <h2 className="text-2xl font-semibold tracking-tight text-[#0f172a]">
          Current Assignments
        </h2>
        <div className="mt-6 overflow-hidden rounded-[28px] border border-[#eef2f6]">
          <table className="min-w-full divide-y divide-[#eef2f6]">
            <thead className="bg-[#f8fafc]">
              <tr className="text-left text-xs uppercase tracking-[0.18em] text-[#94a3b8]">
                {["Item", "Action", "Due"].map((header) => (
                  <th key={header} className="px-6 py-4 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef2f6] bg-white">
              {assignments.map((row) => (
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

export default EmployeeDashboard;
