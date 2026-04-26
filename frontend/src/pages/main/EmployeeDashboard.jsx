import { useEffect, useState } from "react";
import EmployeeSideBar from "../../components/sidebar/EmployeeSideBar";
import MainLayout from "../../layout/MainLayout";
import MetricCard from "../../components/cards/MetricCard";
import { employeeNav } from "../../config/workspaceNav";
import { fetchEmployeeWorkspace } from "../../services/employeeWorkspace";

function EmployeeDashboard() {
  const [workspaceData, setWorkspaceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEmployeeWorkspace() {
      try {
        const data = await fetchEmployeeWorkspace();
        setWorkspaceData(data);
      } catch (loadError) {
        console.error("Could not load employee dashboard.", loadError);
        setError("Could not load the employee dashboard right now.");
      } finally {
        setLoading(false);
      }
    }

    loadEmployeeWorkspace();
  }, []);

  const employeeProfile = workspaceData?.employee;
  const businessProfile = workspaceData?.business;
  const contracts = workspaceData?.contracts ?? [];
  const expenses = workspaceData?.expenses ?? [];
  const transactions = workspaceData?.transactions ?? [];

  // There is no contract-assignment table yet, so for now the dashboard surfaces
  // a small mixed work queue using the business contracts and the employee expense list.
  const assignments = [
    ...contracts.slice(0, 2).map((contract) => ([
      contract.Contract_Name,
      "Review contract details",
      contract.Contract_Completion_Date,
    ])),
    ...expenses.slice(0, 2).map((expense) => ([
      expense.Expense_Title,
      "Review expense item",
      expense.Expense_Due_By,
    ])),
  ];

  const latestTransaction = transactions[0];

  if (loading) {
    return (
      <MainLayout
        sidebar={<EmployeeSideBar />}
        navItems={employeeNav}
        brandLink="/employee/dashboard"
      >
        <section>
          <h1 className="text-5xl font-semibold tracking-tight text-black">Employee Dashboard</h1>
          <p className="mt-3 max-w-3xl text-lg text-[#4b5563]">
            Loading your employee workspace...
          </p>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      sidebar={<EmployeeSideBar />}
      navItems={employeeNav}
      brandLink="/employee/dashboard"
    >
      <section>
        <h1 className="text-5xl font-semibold tracking-tight text-black">Employee Dashboard</h1>
        <p className="mt-3 max-w-3xl text-lg text-[#4b5563]">
          {error
            ? error
            : `Keep up with contract work, expense tasks, and payment history for ${businessProfile?.Business_Name}.`}
        </p>
      </section>

      <section className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-[28px] border border-[#efeafc] bg-[#f6efff] p-8 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6b7280]">
            Assigned Work
          </p>
          <h2 className="mt-5 text-6xl font-semibold tracking-tight text-black">
            {assignments.length.toString().padStart(2, "0")}
          </h2>
          <p className="mt-4 text-sm text-[#4b5563]">
            Work surfaced from the contracts and expenses linked to your business role.
          </p>
        </div>

        <div className="rounded-[28px] border border-[#ececf2] bg-white p-8 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6b7280]">
            Latest Pay
          </p>
          <h3 className="mt-4 text-4xl font-semibold tracking-tight text-[#8b5cf6]">
            ${employeeProfile?.Pay ?? "0.00"}
          </h3>
          <p className="mt-3 text-sm text-[#4b5563]">
            Current pay value stored on your employee record.
          </p>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <MetricCard
          label="Expense Tasks"
          value={expenses.length.toString().padStart(2, "0")}
          subtitle="Expense items linked to your employee role"
          compact
        />
        <MetricCard
          label="Business Contracts"
          value={contracts.length.toString().padStart(2, "0")}
          subtitle="Contracts currently visible to your business workspace"
          compact
        />
        <MetricCard
          label="Payment History"
          value={transactions.length.toString().padStart(2, "0")}
          subtitle="Transactions recorded under your employee account"
          compact
          accent="text-[#8b5cf6]"
        />
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
              {assignments.length === 0 ? (
                <tr className="text-sm text-[#475569]">
                  <td className="px-6 py-5" colSpan={3}>
                    No contract or expense work has been linked to this employee yet.
                  </td>
                </tr>
              ) : assignments.map((row) => (
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
        {latestTransaction ? (
          <p className="mt-5 text-sm text-[#64748b]">
            Latest recorded transaction: {latestTransaction.Transaction_Date}
          </p>
        ) : null}
      </section>
    </MainLayout>
  );
}

export default EmployeeDashboard;
