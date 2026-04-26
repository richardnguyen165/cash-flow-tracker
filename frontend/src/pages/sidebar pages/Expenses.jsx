import { useEffect, useState } from "react";
import EmployeeSideBar from "../../components/sidebar/EmployeeSideBar";
import MainLayout from "../../layout/MainLayout";
import { employeeNav } from "../../config/workspaceNav";
import { fetchEmployeeExpenses, fetchEmployeeProfile } from "../../services/employeeWorkspace";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEmployeeExpenses() {
      try {
        const profile = await fetchEmployeeProfile();
        const expenseData = await fetchEmployeeExpenses(profile.business.id);
        setExpenses(expenseData);
      } catch (loadError) {
        console.error("Could not load employee expenses.", loadError);
        setError("Could not load employee expenses right now.");
      } finally {
        setLoading(false);
      }
    }

    loadEmployeeExpenses();
  }, []);

  return (
    <MainLayout
      sidebar={<EmployeeSideBar />}
      navItems={employeeNav}
      brandLink="/employee/dashboard"
    >
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b5cf6]">
          Expense Workflow
        </p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[#0f172a]">
          Expense Tasks
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-[#64748b]">
          {loading
            ? "Loading the expense items connected to your employee role..."
            : error || "Review the expense items and pay-off tasks connected to your employee account."}
        </p>
      </section>

      <section className="mt-8 rounded-[32px] border border-[#e7edf5] bg-white p-8 shadow-[0_16px_45px_rgba(15,23,42,0.04)]">
        <h2 className="text-2xl font-semibold tracking-tight text-[#0f172a]">
          Assigned Expense Work
        </h2>
        <div className="mt-6 overflow-hidden rounded-[28px] border border-[#eef2f6]">
          <table className="min-w-full divide-y divide-[#eef2f6]">
            <thead className="bg-[#f8fafc]">
              <tr className="text-left text-xs uppercase tracking-[0.18em] text-[#94a3b8]">
                {["Expense", "Type", "Due By", "Cost"].map((header) => (
                  <th key={header} className="px-6 py-4 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef2f6] bg-white">
              {expenses.length === 0 ? (
                <tr className="text-sm text-[#475569]">
                  <td className="px-6 py-5" colSpan={4}>
                    {loading
                      ? "Loading expense work..."
                      : "No expense items are linked to this employee right now."}
                  </td>
                </tr>
              ) : expenses.map((expense) => (
                <tr key={expense.id} className="text-sm text-[#0f172a]">
                  <td className="px-6 py-5 font-medium">{expense.Expense_Title}</td>
                  <td className="px-6 py-5 text-[#475569]">{expense.Expense_Type}</td>
                  <td className="px-6 py-5 text-[#475569]">{expense.Expense_Due_By}</td>
                  <td className="px-6 py-5 font-semibold text-[#8b5cf6]">${expense.Cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </MainLayout>
  );
}

export default Expenses;
