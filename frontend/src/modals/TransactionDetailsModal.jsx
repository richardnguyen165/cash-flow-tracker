function TransactionDetailsModal({ isOpen, onClose, transaction }) {
  if (!isOpen) return null;

  const type = transaction?.type || transaction?.method || "Transaction";
  const isExpensePayOff = type === "Expense-Pay Off";
  const isInvoicePayOff = type === "Invoice Pay Off";
  const isInvoice = type === "Invoice";
  const invoiceLineRows =
    transaction?.lineItems ||
    transaction?.invoiceRecord?.invoice_line_items ||
    [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[82vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-white shadow-2xl">
        <div className="p-8">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <p className="inline-flex rounded-full bg-purple-50 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-purple-500">
                Transaction Details
              </p>

              <h2 className="mt-5 text-[32px] font-semibold leading-tight tracking-[-0.02em] text-[#111827]">
                {transaction?.description || "Transaction"}
              </h2>

              <p className="mt-2 text-[15px] text-[#9ca3af]">
                Transaction ID: {transaction?.id || "TRX-0000"}
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
              <InfoBlock label="Date" value={transaction?.date || "N/A"} />
              <InfoBlock label="Type" value={type} />
              <InfoBlock label="Method" value={transaction?.method || "N/A"} />
              <InfoBlock label="Amount" value={transaction?.amount || "$0.00"} />
            </div>
          </div>

          {isExpensePayOff && (
            <div className="mt-2 border-t border-[#edf1f5] pt-8">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#c2c8d0]">
                Expense Plan
              </p>

              <div className="mt-4 rounded-2xl bg-[#f8fafc] px-6 py-5 text-[15px] leading-8 text-[#5b6472]">
                <p className="font-semibold text-[#111827]">
                  {transaction?.expensePlan?.title || transaction?.description}
                </p>
                <p className="mt-1">
                  Lump-sum pay-off amount:{" "}
                  {transaction?.expensePayOff?.Display_Total_Pay ||
                    transaction?.expensePayOff?.Total_Pay ||
                    transaction?.amount}
                </p>
              </div>

              {transaction?.expensePlan?.expenses?.length > 0 && (
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
                      {transaction.expensePlan.expenses.map((expense) => (
                        <tr key={expense.id} className="text-sm">
                          <td className="px-5 py-5 font-semibold text-[#111827]">
                            {expense.title}
                          </td>
                          <td className="px-5 py-5 text-[#5b6472]">
                            {expense.type}
                          </td>
                          <td className="px-5 py-5 text-[#5b6472]">
                            {expense.dueBy}
                          </td>
                          <td className="px-5 py-5 font-semibold text-[#111827]">
                            {expense.cost}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {(isInvoice || isInvoicePayOff) && (
            <div className="mt-2 border-t border-[#edf1f5] pt-8">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#c2c8d0]">
                {isInvoicePayOff ? "Invoice pay-off" : "Invoice Lines"}
              </p>

              {isInvoicePayOff && (
                <div className="mt-3 rounded-2xl bg-[#f8fafc] px-5 py-4 text-sm text-[#5b6472]">
                  <span className="font-semibold text-[#111827]">
                    {transaction?.invoiceRecord?.Name || "Invoice"}
                  </span>
                  <span className="mx-2 text-[#cbd5e1]">·</span>
                  <span>
                    Pay-off:{" "}
                    {transaction?.invoicePayOff?.Display_Total_Pay ||
                      transaction?.invoicePayOff?.Total_Pay ||
                      transaction?.amount}
                  </span>
                </div>
              )}

              <div className="mt-4 overflow-hidden rounded-2xl border border-[#e5eaf0]">
                <table className="min-w-full divide-y divide-[#eef2f6]">
                  <thead className="bg-[#f8fafc]">
                    <tr className="text-left text-xs uppercase tracking-[0.18em] text-[#94a3b8]">
                      <th className="px-5 py-4 font-semibold">#</th>
                      <th className="px-5 py-4 font-semibold">Header</th>
                      <th className="px-5 py-4 font-semibold">Description</th>
                      <th className="px-5 py-4 font-semibold">Qty</th>
                      <th className="px-5 py-4 font-semibold">Cost</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#eef2f6] bg-white">
                    {invoiceLineRows.map((line, index) => (
                      <tr key={`${line.Header || line.title}-${index}`} className="text-sm">
                        <td className="px-5 py-5 font-medium text-[#5b6472]">
                          {line.Line_Number || index + 1}
                        </td>
                        <td className="px-5 py-5 font-semibold text-[#111827]">
                          {line.Header || line.title}
                        </td>
                        <td className="px-5 py-5 leading-6 text-[#5b6472]">
                          {line.Description || line.description || "N/A"}
                        </td>
                        <td className="px-5 py-5 font-medium text-[#111827]">
                          {line.Quantity || line.quantity || 1}
                        </td>
                        <td className="px-5 py-5 font-semibold text-[#111827]">
                          {line.Cost || line.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {transaction?.balanceAdjustment && (
            <div className="mt-2 border-t border-[#edf1f5] pt-8">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#c2c8d0]">
                Balance Adjustment
              </p>

              <div className="mt-4 grid grid-cols-1 gap-x-16 gap-y-8 md:grid-cols-2">
                <InfoBlock
                  label="Direction"
                  value={transaction.balanceAdjustment.direction}
                />
                <InfoBlock
                  label="Amount"
                  value={transaction.balanceAdjustment.amount}
                />
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-[#edf1f5] bg-[#fafbfc] px-8 py-4 text-center text-[12px] font-medium text-[#c2c8d0]">
          Transaction ID: {transaction?.id || "TRX-0000"}
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

export default TransactionDetailsModal;
