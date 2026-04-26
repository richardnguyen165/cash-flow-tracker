function ExpensePlanDetailsModal({
  isOpen,
  onClose,
  expensePlan,
  onAddExpense,
  onExpenseClick,
}) {
  if (!isOpen) return null;

  const expenses = expensePlan?.expenses || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[82vh] w-full max-w-3xl overflow-y-auto rounded-[28px] bg-white shadow-2xl">
        <div className="p-8">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <p className="inline-flex rounded-full bg-purple-50 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-purple-500">
                Expense Plan
              </p>

              <h2 className="mt-5 text-[32px] font-semibold leading-tight tracking-[-0.02em] text-[#111827]">
                {expensePlan?.Plan_Title || "Expense Plan"}
              </h2>

              <p className="mt-2 text-[15px] text-[#9ca3af]">
                Plan ID: {expensePlan?.id || "PLAN-0000"}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-1 shrink-0 text-3xl font-light leading-none text-gray-400 transition hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <div className="mt-2 border-t border-[#edf1f5] pt-8">
            <div className="grid grid-cols-1 gap-x-16 gap-y-8 md:grid-cols-3">
              <InfoBlock
                label="Due Date"
                value={expensePlan?.Expense_Plan_Due || "N/A"}
              />
              <InfoBlock
                label="Frequency"
                value={expensePlan?.Plan_Frequency || "One-time"}
              />
              <InfoBlock
                label="Occurrence"
                value={String(expensePlan?.Occurance_Number || 1)}
              />
              <InfoBlock label="Expense Count" value={String(expenses.length)} />
              <InfoBlock
                label="Total Cost"
                value={formatAmount(getPlanTotal(expenses))}
              />
            </div>
          </div>

          <div className="mt-2 border-t border-[#edf1f5] pt-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#c2c8d0]">
                Expenses
              </p>

              <button
                type="button"
                onClick={onAddExpense}
                className="rounded-full bg-[#111827] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-black"
              >
                + Add Expense
              </button>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-[#e5eaf0]">
              <table className="min-w-full divide-y divide-[#eef2f6]">
                <thead className="bg-[#f8fafc]">
                  <tr className="text-left text-xs uppercase tracking-[0.18em] text-[#94a3b8]">
                    <th className="px-5 py-4 font-semibold">Expense</th>
                    <th className="px-5 py-4 font-semibold">Type</th>
                    <th className="px-5 py-4 font-semibold">Due</th>
                    <th className="px-5 py-4 font-semibold">Cost</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#eef2f6] bg-white">
                  {expenses.length === 0 ? (
                    <tr className="text-sm text-[#64748b]">
                      <td className="px-5 py-5" colSpan={4}>
                        No expenses have been added to this plan yet.
                      </td>
                    </tr>
                  ) : (
                    expenses.map((expense) => (
                      <tr
                        key={expense.id}
                        onClick={() => onExpenseClick?.(expense)}
                        className="cursor-pointer text-sm text-[#0f172a] transition hover:bg-[#f8fafc]"
                      >
                        <td className="px-5 py-5 font-semibold">
                          {expense.Expense_Title}
                        </td>
                        <td className="px-5 py-5 text-[#475569]">
                          {expense.Expense_Type}
                        </td>
                        <td className="px-5 py-5 text-[#475569]">
                          {expense.Expense_Due_By}
                        </td>
                        <td className="px-5 py-5 font-semibold">
                          {expense.Cost}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="border-t border-[#edf1f5] bg-[#fafbfc] px-8 py-4 text-center text-[12px] font-medium text-[#c2c8d0]">
          Plan ID: {expensePlan?.id || "PLAN-0000"}
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div className="flex flex-col">
      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#c2c8d0]">
        {label}
      </p>
      <p className="mt-3 text-[18px] font-medium leading-7 text-[#111827]">
        {value}
      </p>
    </div>
  );
}

function getPlanTotal(expenses) {
  return expenses.reduce((sum, expense) => sum + parseAmount(expense.Cost), 0);
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

export default ExpensePlanDetailsModal;
