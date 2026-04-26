import { useState } from "react";

const emptyTransaction = {
  type: "Expense-Pay Off",
  expensePlanId: "",
  invoiceTitle: "",
  balanceAdjustmentEnabled: false,
  balanceAdjustmentDirection: "Increase",
  balanceAdjustmentAmount: "",
};

const emptyInvoiceLine = {
  header: "",
  description: "",
  quantity: "1",
  cost: "",
};

function CreateTransactionModal({
  isOpen,
  onClose,
  onSubmit,
  expensePlans = [],
}) {
  const [formData, setFormData] = useState(emptyTransaction);
  const [invoiceLines, setInvoiceLines] = useState([{ ...emptyInvoiceLine }]);

  if (!isOpen) return null;

  const selectedExpensePlan =
    expensePlans.find((plan) => plan.id === formData.expensePlanId) ||
    expensePlans[0];

  function handleChange(e) {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleTypeChange(type) {
    setFormData((prev) => ({
      ...prev,
      type,
      expensePlanId:
        type === "Expense-Pay Off"
          ? prev.expensePlanId || expensePlans[0]?.id || ""
          : prev.expensePlanId,
    }));
  }

  function handleInvoiceLineChange(index, field, value) {
    setInvoiceLines((prev) =>
      prev.map((line, lineIndex) =>
        lineIndex === index ? { ...line, [field]: value } : line
      )
    );
  }

  function addInvoiceLine() {
    setInvoiceLines((prev) => [...prev, { ...emptyInvoiceLine }]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const balanceAdjustment = formData.balanceAdjustmentEnabled
      ? {
          direction: formData.balanceAdjustmentDirection,
          amount: formatAmount(formData.balanceAdjustmentAmount),
        }
      : null;

    const transaction =
      formData.type === "Expense-Pay Off"
        ? createExpenseTransaction(selectedExpensePlan, balanceAdjustment)
        : createInvoiceTransaction(formData.invoiceTitle, invoiceLines, balanceAdjustment);

    onSubmit(transaction);
    setFormData(emptyTransaction);
    setInvoiceLines([{ ...emptyInvoiceLine }]);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[82vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-white shadow-2xl">
        <form onSubmit={handleSubmit}>
          <div className="p-8">
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0">
                <p className="inline-flex rounded-full bg-purple-50 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-purple-500">
                  New Transaction
                </p>

                <h2 className="mt-5 text-[32px] font-semibold leading-tight tracking-[-0.02em] text-[#111827]">
                  Create Transaction
                </h2>

                <p className="mt-2 text-[15px] text-[#9ca3af]">
                  Choose an expense pay-off or invoice transaction.
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
              <BiSelector
                label="Transaction Type"
                value={formData.type}
                options={["Expense-Pay Off", "Invoice"]}
                onChange={handleTypeChange}
              />
            </div>

            {formData.type === "Expense-Pay Off" ? (
              <div className="mt-2 border-t border-[#edf1f5] pt-8">
                <SelectInput
                  label="Expense Plan"
                  name="expensePlanId"
                  value={formData.expensePlanId || selectedExpensePlan?.id || ""}
                  onChange={handleChange}
                  options={expensePlans.map((plan) => ({
                    label: `${plan.title} - ${formatAmount(getExpensePlanTotal(plan))}`,
                    value: plan.id,
                  }))}
                  required
                />

                {selectedExpensePlan && (
                  <div className="mt-6 rounded-2xl bg-[#f8fafc] px-6 py-5 text-[15px] leading-7 text-[#5b6472]">
                    <p className="font-semibold text-[#111827]">
                      Lump-sum payment:{" "}
                      {formatAmount(getExpensePlanTotal(selectedExpensePlan))}
                    </p>
                    <p className="mt-1">
                      This will pay off all expenses attached to the selected
                      expense plan.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-2 border-t border-[#edf1f5] pt-8">
                <FormInput
                  label="Invoice Title"
                  name="invoiceTitle"
                  value={formData.invoiceTitle}
                  onChange={handleChange}
                  placeholder="April Services Invoice"
                  required
                />

                <div className="mt-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#c2c8d0]">
                      Invoice Lines
                    </p>

                    <button
                      type="button"
                      onClick={addInvoiceLine}
                      className="rounded-full border border-[#e5eaf0] bg-white px-4 py-2 text-sm font-semibold text-[#64748b] transition hover:bg-[#f8fafc]"
                    >
                      Add Line
                    </button>
                  </div>

                  <div className="mt-4 space-y-4">
                    {invoiceLines.map((line, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_110px_160px]"
                      >
                        <input
                          value={line.header}
                          onChange={(e) =>
                            handleInvoiceLineChange(index, "header", e.target.value)
                          }
                          placeholder="Header"
                          required
                          className="rounded-xl border border-[#e5eaf0] bg-white px-4 py-3 text-[15px] font-medium text-[#111827] outline-none transition placeholder:text-[#aab2bf] focus:border-purple-300 focus:ring-4 focus:ring-purple-50"
                        />
                        <input
                          value={line.quantity}
                          onChange={(e) =>
                            handleInvoiceLineChange(index, "quantity", e.target.value)
                          }
                          placeholder="Qty"
                          required
                          className="rounded-xl border border-[#e5eaf0] bg-white px-4 py-3 text-[15px] font-medium text-[#111827] outline-none transition placeholder:text-[#aab2bf] focus:border-purple-300 focus:ring-4 focus:ring-purple-50"
                        />
                        <input
                          value={line.cost}
                          onChange={(e) =>
                            handleInvoiceLineChange(index, "cost", e.target.value)
                          }
                          placeholder="Cost"
                          required
                          className="rounded-xl border border-[#e5eaf0] bg-white px-4 py-3 text-[15px] font-medium text-[#111827] outline-none transition placeholder:text-[#aab2bf] focus:border-purple-300 focus:ring-4 focus:ring-purple-50"
                        />
                        <textarea
                          value={line.description}
                          onChange={(e) =>
                            handleInvoiceLineChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Description"
                          rows={3}
                          className="rounded-xl border border-[#e5eaf0] bg-white px-4 py-3 text-[15px] font-medium text-[#111827] outline-none transition placeholder:text-[#aab2bf] focus:border-purple-300 focus:ring-4 focus:ring-purple-50 md:col-span-3"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-2 border-t border-[#edf1f5] pt-8">
              <label className="flex items-center gap-3 text-[15px] font-semibold text-[#111827]">
                <input
                  type="checkbox"
                  name="balanceAdjustmentEnabled"
                  checked={formData.balanceAdjustmentEnabled}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-[#cbd5e1] text-purple-500 focus:ring-purple-300"
                />
                Adjust owner balance
              </label>

              {formData.balanceAdjustmentEnabled && (
                <div className="mt-6 grid grid-cols-1 gap-x-16 gap-y-6 md:grid-cols-2">
                  <SelectInput
                    label="Direction"
                    name="balanceAdjustmentDirection"
                    value={formData.balanceAdjustmentDirection}
                    onChange={handleChange}
                    options={[
                      { label: "Increase", value: "Increase" },
                      { label: "Decrease", value: "Decrease" },
                    ]}
                  />

                  <FormInput
                    label="Adjustment Amount"
                    name="balanceAdjustmentAmount"
                    value={formData.balanceAdjustmentAmount}
                    onChange={handleChange}
                    placeholder="$0.00"
                    required
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-[#edf1f5] bg-[#fafbfc] px-8 py-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-[#e5eaf0] bg-white px-5 py-2.5 text-sm font-semibold text-[#64748b] transition hover:bg-[#f8fafc]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-full bg-[#111827] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-black"
            >
              Create Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function createExpenseTransaction(expensePlan, balanceAdjustment) {
  const totalPay = formatAmount(getExpensePlanTotal(expensePlan));

  return {
    id: `TRX-${Date.now()}`,
    date: formatDate(new Date()),
    description: `Expense Plan Pay-Off - ${expensePlan?.title || "Expense Plan"}`,
    method: "Expense-Pay Off",
    amount: `-${totalPay}`,
    type: "Expense-Pay Off",
    expensePlan,
    expensePayOff: {
      Expense_Plan_ID: expensePlan?.id || "",
      Expense_IDs: expensePlan?.expenses?.map((expense) => expense.id) || [],
      Total_Pay: totalPay,
    },
    balanceAdjustment,
  };
}

function createInvoiceTransaction(invoiceTitle, invoiceLines, balanceAdjustment) {
  const lineItems = invoiceLines.map((line, index) => ({
    Line_Number: index + 1,
    Header: line.header,
    Description: line.description,
    Quantity: Number(line.quantity) || 1,
    Cost: formatAmount(line.cost),
  }));
  const total = lineItems.reduce(
    (sum, line) => sum + parseAmount(line.Cost) * line.Quantity,
    0
  );

  return {
    id: `TRX-${Date.now()}`,
    date: formatDate(new Date()),
    description: `Invoice - ${invoiceTitle}`,
    method: "Invoice",
    amount: `+${formatAmount(total)}`,
    type: "Invoice",
    invoiceTitle,
    lineItems,
    invoice: {
      Name: invoiceTitle,
      Has_Paid: false,
      Policy_Description: "",
      invoice_line_items: lineItems,
    },
    balanceAdjustment,
  };
}

function getExpensePlanTotal(expensePlan) {
  return (
    expensePlan?.expenses?.reduce(
      (sum, expense) => sum + parseAmount(expense.cost),
      0
    ) || 0
  );
}

function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function parseAmount(value) {
  const parsed = Number(String(value).replace(/[^0-9.-]/g, ""));

  return Number.isFinite(parsed) ? parsed : 0;
}

function formatAmount(value) {
  const parsed = typeof value === "number" ? value : parseAmount(value);

  return parsed.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function FormInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div className="flex flex-col">
      <label className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#c2c8d0]">
        {label}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="mt-3 rounded-xl border border-[#e5eaf0] bg-white px-4 py-3 text-[15px] font-medium text-[#111827] outline-none transition placeholder:text-[#aab2bf] focus:border-purple-300 focus:ring-4 focus:ring-purple-50"
      />
    </div>
  );
}

function SelectInput({ label, name, value, onChange, options, required = false }) {
  return (
    <div className="flex flex-col">
      <label className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#c2c8d0]">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-3 rounded-xl border border-[#e5eaf0] bg-white px-4 py-3 text-[15px] font-medium text-[#111827] outline-none transition focus:border-purple-300 focus:ring-4 focus:ring-purple-50"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function BiSelector({ label, value, options, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#c2c8d0]">
        {label}
      </label>

      <div className="mt-3 grid grid-cols-2 rounded-xl border border-[#e5eaf0] bg-[#f8fafc] p-1">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-lg px-4 py-2.5 text-[15px] font-semibold transition ${
              value === option
                ? "bg-white text-[#111827] shadow-sm"
                : "text-[#64748b] hover:text-[#111827]"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CreateTransactionModal;
