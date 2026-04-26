import ClientSidebar from "../../components/sidebar/ClientSideBar";
import EmployeeSideBar from "../../components/sidebar/EmployeeSideBar";
import MainLayout from "../../layout/MainLayout";
import { clientNav, employeeNav } from "../../config/workspaceNav";

const defaultTasks = [
  ["Receipt batch #212", "Verify submitted reimbursement documents", "Today"],
  ["Expense Plan Q2", "Match entries to plan categories", "Apr 20, 2026"],
  ["Vendor Payment Review", "Attach notes before admin approval", "Apr 22, 2026"],
];

const clientExpensePlans = [
  ["Expense Plan Q2", "Available for pay-off", "$12,800.00"],
  ["Vendor Payment Review", "Available for pay-off", "$5,200.00"],
  ["Employee Reimbursement Batch", "Available for pay-off", "$640.00"],
];

function Expenses({
  sidebar = <EmployeeSideBar />,
  navItems = employeeNav,
  brandLink = "/employee/dashboard",
  eyebrow = "Expense Workflow",
  title = "Expense Tasks",
  description = "Review the expense items and pay-off tasks that your business admin has assigned to your account.",
  tableTitle = "Assigned Expense Work",
  columns = ["Task", "Action", "Due"],
  rows = defaultTasks,
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

      <section className="mt-8 rounded-4xl border border-[#e7edf5] bg-white p-8 shadow-[0_16px_45px_rgba(15,23,42,0.04)]">
        <h2 className="text-2xl font-semibold tracking-tight text-[#0f172a]">
          {tableTitle}
        </h2>
        <div className="mt-6 overflow-hidden rounded-[28px] border border-[#eef2f6]">
          <table className="min-w-full divide-y divide-[#eef2f6]">
            <thead className="bg-[#f8fafc]">
              <tr className="text-left text-xs uppercase tracking-[0.18em] text-[#94a3b8]">
                {columns.map((header) => (
                  <th key={header} className="px-6 py-4 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef2f6] bg-white">
              {rows.map((row) => (
                <tr key={row[0]} className="text-sm text-[#0f172a]">
                  {row.map((cell, index) => (
                    <td
                      key={`${row[0]}-${index}`}
                      className={`px-6 py-5 ${
                        index === 0 ? "font-medium" : "text-[#475569]"
                      }`}
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

export function ClientExpenses() {
  return (
    <Expenses
      sidebar={<ClientSidebar />}
      navItems={clientNav}
      brandLink="/dashboard"
      eyebrow="Expenses"
      title="My Expenses"
      description="Review expense plans that are available for lump-sum pay-off from your payments workspace."
      tableTitle="Available Expense Plans"
      columns={["Expense Plan", "Status", "Balance"]}
      rows={clientExpensePlans}
    />
  );
}

export default Expenses;
