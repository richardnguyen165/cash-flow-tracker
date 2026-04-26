import { useState } from "react";
import ClientSidebar from "../../components/sidebar/ClientSideBar";
import EmployeeSideBar from "../../components/sidebar/EmployeeSideBar";
import MainLayout from "../../layout/MainLayout";
import { clientNav, employeeNav } from "../../config/workspaceNav";
import CreateExpenseModal from "../../modals/CreateExpenseModal";
import CreateExpensePlanModal from "../../modals/CreateExpensePlanModal";
import ExpenseDetailsModal from "../../modals/ExpenseDetailsModal";
import ExpensePlanDetailsModal from "../../modals/ExpensePlanDetailsModal";

const employeeExpensePlans = [
  {
    id: "PLAN-EMP-TASKS",
    Plan_Title: "Employee Expense Tasks",
    Expense_Plan_Due: "Apr 22, 2026",
    Plan_Frequency: "Weekly",
    Occurance_Number: 1,
    expenses: [
      {
        id: "EXP-TASK-212",
        Expense_Title: "Receipt batch #212",
        Expense_Type: "Receipt Review",
        Description: "Verify submitted reimbursement documents.",
        Cost: "$0.00",
        Plan_Title: "Employee Expense Tasks",
        Expense_Date_Issued: "Apr 18, 2026",
        Expense_Due_By: "Today",
        status: "Assigned",
      },
    ],
  },
  {
    id: "PLAN-Q2",
    Plan_Title: "Expense Plan Q2",
    Expense_Plan_Due: "Apr 20, 2026",
    Plan_Frequency: "Quarterly",
    Occurance_Number: 2,
    expenses: [
      {
        id: "EXP-Q2-TASK",
        Expense_Title: "Expense Plan Q2",
        Expense_Type: "Plan Review",
        Description: "Match entries to plan categories.",
        Cost: "$12,800.00",
        Plan_Title: "Expense Plan Q2",
        Expense_Date_Issued: "Apr 18, 2026",
        Expense_Due_By: "Apr 20, 2026",
        status: "Assigned",
      },
    ],
  },
  {
    id: "PLAN-VENDOR",
    Plan_Title: "Vendor Payment Review",
    Expense_Plan_Due: "Apr 22, 2026",
    Plan_Frequency: "Monthly",
    Occurance_Number: 1,
    expenses: [
      {
        id: "EXP-VENDOR-TASK",
        Expense_Title: "Vendor Payment Review",
        Expense_Type: "Vendor",
        Description: "Attach notes before admin approval.",
        Cost: "$5,200.00",
        Plan_Title: "Vendor Payment Review",
        Expense_Date_Issued: "Apr 18, 2026",
        Expense_Due_By: "Apr 22, 2026",
        status: "Assigned",
      },
    ],
  },
];

const clientExpensePlans = [
  {
    id: "PLAN-Q2",
    Plan_Title: "Expense Plan Q2",
    Expense_Plan_Due: "Apr 20, 2026",
    Plan_Frequency: "Quarterly",
    Occurance_Number: 2,
    expenses: [
      {
        id: "EXP-Q2-001",
        Expense_Title: "Vendor Settlement",
        Expense_Type: "Vendor",
        Description: "Expenses available for lump-sum pay-off.",
        Cost: "$12,800.00",
        Plan_Title: "Expense Plan Q2",
        Expense_Date_Issued: "Apr 18, 2026",
        Expense_Due_By: "Apr 20, 2026",
        status: "Available for pay-off",
      },
    ],
  },
  {
    id: "PLAN-REIMB",
    Plan_Title: "Employee Reimbursement Batch",
    Expense_Plan_Due: "Apr 30, 2026",
    Plan_Frequency: "Monthly",
    Occurance_Number: 1,
    expenses: [
      {
        id: "EXP-REIMB-001",
        Expense_Title: "Employee Reimbursement Batch",
        Expense_Type: "Reimbursement",
        Description: "Approved reimbursement expenses available for pay-off.",
        Cost: "$640.00",
        Plan_Title: "Employee Reimbursement Batch",
        Expense_Date_Issued: "Apr 18, 2026",
        Expense_Due_By: "Apr 30, 2026",
        status: "Available for pay-off",
      },
    ],
  },
];

function Expenses({
  sidebar = <EmployeeSideBar />,
  navItems = employeeNav,
  brandLink = "/employee/dashboard",
  eyebrow = "Expense Workflow",
  title = "Expense Tasks",
  description = "Review expense plans and the expenses assigned under each plan.",
  tableTitle = "Expense Plans",
  expensePlans = employeeExpensePlans,
}) {
  const [plans, setPlans] = useState(expensePlans);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isCreatePlanOpen, setIsCreatePlanOpen] = useState(false);
  const [isCreateExpenseOpen, setIsCreateExpenseOpen] = useState(false);

  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);

  function handleCreateExpense(newExpense) {
    setPlans((prev) =>
      prev.map((plan) =>
        plan.id === selectedPlanId
          ? { ...plan, expenses: [newExpense, ...(plan.expenses || [])] }
          : plan
      )
    );
  }

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
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-[#0f172a]">
            {tableTitle}
          </h2>

          <button
            type="button"
            onClick={() => setIsCreatePlanOpen(true)}
            className="rounded-2xl bg-[#111827] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
          >
            + New Expense Plan
          </button>
        </div>

        <div className="mt-6 overflow-hidden rounded-[28px] border border-[#eef2f6]">
          <table className="min-w-full divide-y divide-[#eef2f6]">
            <thead className="bg-[#f8fafc]">
              <tr className="text-left text-xs uppercase tracking-[0.18em] text-[#94a3b8]">
                <th className="px-6 py-4 font-semibold">Expense Plan</th>
                <th className="px-6 py-4 font-semibold">Due Date</th>
                <th className="px-6 py-4 font-semibold">Expenses</th>
                <th className="px-6 py-4 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef2f6] bg-white">
              {plans.map((plan) => (
                <tr
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className="cursor-pointer text-sm text-[#0f172a] transition hover:bg-[#f8fafc]"
                >
                  <td className="px-6 py-5 font-medium">{plan.Plan_Title}</td>
                  <td className="px-6 py-5 text-[#475569]">
                    {plan.Expense_Plan_Due}
                  </td>
                  <td className="px-6 py-5 text-[#475569]">
                    {(plan.expenses || []).length}
                  </td>
                  <td className="px-6 py-5 font-semibold">
                    {formatAmount(getPlanTotal(plan))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <CreateExpensePlanModal
        isOpen={isCreatePlanOpen}
        onClose={() => setIsCreatePlanOpen(false)}
        onSubmit={(newPlan) => setPlans((prev) => [newPlan, ...prev])}
      />

      <CreateExpenseModal
        isOpen={isCreateExpenseOpen}
        onClose={() => setIsCreateExpenseOpen(false)}
        expensePlan={selectedPlan}
        onSubmit={handleCreateExpense}
      />

      <ExpensePlanDetailsModal
        isOpen={!!selectedPlan && !isCreateExpenseOpen && !selectedExpense}
        onClose={() => setSelectedPlanId(null)}
        expensePlan={selectedPlan}
        onAddExpense={() => setIsCreateExpenseOpen(true)}
        onExpenseClick={setSelectedExpense}
      />

      <ExpenseDetailsModal
        isOpen={!!selectedExpense}
        onClose={() => setSelectedExpense(null)}
        expense={selectedExpense}
      />
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
      expensePlans={clientExpensePlans}
    />
  );
}

function getPlanTotal(plan) {
  return (plan.expenses || []).reduce(
    (sum, expense) => sum + parseAmount(expense.Cost),
    0
  );
}

function parseAmount(value) {
  const parsed = Number(String(value).replace(/[^0-9.-]/g, ""));

  return Number.isFinite(parsed) ? parsed : 0;
}

function formatAmount(value) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export default Expenses;