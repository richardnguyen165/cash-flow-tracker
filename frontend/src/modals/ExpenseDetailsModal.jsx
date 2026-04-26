function ExpenseDetailsModal({ isOpen, onClose, expense }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[82vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-white shadow-2xl">
        <div className="p-8">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <p className="inline-flex rounded-full bg-purple-50 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-purple-500">
                Expense Details
              </p>

              <h2 className="mt-5 text-[32px] font-semibold leading-tight tracking-[-0.02em] text-[#111827]">
                {expense?.Expense_Title || expense?.title || "Expense"}
              </h2>

              <p className="mt-2 text-[15px] text-[#9ca3af]">
                Expense ID: {expense?.id || "EXP-0000"}
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
            <div className="grid grid-cols-1 gap-x-16 gap-y-8 md:grid-cols-2">
              <InfoBlock
                label="Expense Plan"
                value={expense?.Plan_Title || expense?.planTitle || "N/A"}
              />
              <InfoBlock
                label="Expense Type"
                value={expense?.Expense_Type || expense?.type || "N/A"}
              />
              <InfoBlock
                label="Cost"
                value={expense?.Cost || expense?.cost || "$0.00"}
              />
              <InfoBlock
                label="Status"
                value={expense?.status || "Available for pay-off"}
              />
              <InfoBlock
                label="Date Issued"
                value={expense?.Expense_Date_Issued || "N/A"}
              />
              <InfoBlock
                label="Due By"
                value={expense?.Expense_Due_By || expense?.due || "N/A"}
              />
            </div>
          </div>

          <div className="mt-2 border-t border-[#edf1f5] pt-8">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#c2c8d0]">
              Description
            </p>

            <div className="mt-4 rounded-2xl bg-[#f8fafc] px-6 py-5 text-[15px] leading-8 text-[#5b6472]">
              {expense?.Description ||
                expense?.description ||
                "No expense description provided."}
            </div>
          </div>
        </div>

        <div className="border-t border-[#edf1f5] bg-[#fafbfc] px-8 py-4 text-center text-[12px] font-medium text-[#c2c8d0]">
          Expense ID: {expense?.id || "EXP-0000"}
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

export default ExpenseDetailsModal;
