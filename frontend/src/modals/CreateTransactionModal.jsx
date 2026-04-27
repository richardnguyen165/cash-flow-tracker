import { useEffect, useState } from "react";
import decodeTokens from "../services/decode-tokens";

const emptyFormFields = {
  type: "Expense-Pay Off",
  expensePlanId: "",
  invoicePayOffId: "",
  invoiceTitle: "",
  balanceAdjustmentEnabled: false,
  balanceAdjustmentDirection: "Increase",
  balanceAdjustmentAmount: "",
};

function getTransactionTypeOptions(userRole, hasInvoices) {
  if (userRole === "INDIVIDUAL") {
    return ["Invoice Pay Off"];
  }
  if (userRole === "BUSINESS_ADMIN") {
    return ["Expense-Pay Off", "Invoice Pay Off"];
  }
}

function defaultTypeForProps(userRole, allowExpense, invoices) {
  const hasInvoices = Array.isArray(invoices) && invoices.length > 0;
  if (userRole === "INDIVIDUAL") return "Invoice Pay Off";
  if (userRole === "BUSINESS_ADMIN") return "Expense-Pay Off";
  if (allowExpense) return "Expense-Pay Off";
  return hasInvoices ? "Invoice Pay Off" : "Invoice";
}

function buildInitialForm(userRole, allowExpense, invoices) {
  const hasInvoices = Array.isArray(invoices) && invoices.length > 0;
  return {
    ...emptyFormFields,
    type: defaultTypeForProps(userRole, allowExpense, invoices),
    expensePlanId: "",
    invoicePayOffId: hasInvoices ? String(invoices[0].id) : "",
  };
}

function modalSubtitleText(userRole) {
  if (userRole === "INDIVIDUAL") {
    return "Choose an invoice from your list to record a payment toward it.";
  }
  else {
    return "Pay off an expense plan or settle an existing invoice.";
  }
}

function typeOptionDisplayLabel(option) {
  if (option === "Invoice Pay Off") return "Invoice pay-off";
  if (option === "Expense-Pay Off") return "Expense pay-off";
  if (option === "Invoice") return "New invoice";
  return option;
}

function CreateTransactionModal({
  isOpen,
  onClose,
  onSubmit,
  expensePlans = [],
  invoices = [],
  allowExpense = true,
  userRole = null,
  businessId = null,
  individualId = null,
}) {
  const hasInvoices = Array.isArray(invoices) && invoices.length > 0;

  const transactionTypeOptions = getTransactionTypeOptions(
    userRole,
    allowExpense,
    hasInvoices
  );

  const [formData, setFormData] = useState(() =>
    buildInitialForm(userRole, allowExpense, invoices)
  );
 
  useEffect(() => {
    if (!isOpen) return;
    setFormData(buildInitialForm(userRole, allowExpense, invoices));
  }, [isOpen, allowExpense, invoices, userRole]);

  useEffect(() => {
    if (!isOpen || formData.type !== "Invoice Pay Off" || !hasInvoices) return;
    setFormData((prev) => {
      if (prev.invoicePayOffId) return prev;
      return { ...prev, invoicePayOffId: String(invoices[0].id) };
    });
  }, [isOpen, formData.type, hasInvoices, invoices, formData.invoicePayOffId]);

  if (!isOpen) return null;

  // Help with choosing the selected expense plan or inovice and storing them in case of submission
  const selectedExpensePlan =
    expensePlans.find((plan) => plan.id === formData.expensePlanId) ||
    expensePlans[0];

  const selectedInvoice =
    invoices.find((inv) => String(inv.id) === String(formData.invoicePayOffId)) ||
    invoices[0];

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
          : "",
      invoicePayOffId:
        type === "Invoice Pay Off"
          ? prev.invoicePayOffId || (invoices[0] ? String(invoices[0].id) : "")
          : "",
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (formData.type === "Invoice Pay Off") {
      if (!hasInvoices || !selectedInvoice) return;
    }

    const decoded = decodeTokens();
    const resolvedBusinessId = businessId ?? decoded?.business_id ?? null;
    const resolvedIndividualId = individualId ?? decoded?.id ?? null;
    let payload = null;

    if (formData.type === "Expense-Pay Off") {
      if (!selectedExpensePlan) return;
      payload = buildExpensePlanPayOffPayload(selectedExpensePlan, resolvedBusinessId);
    } else if (formData.type === "Invoice Pay Off") {
      if (!hasInvoices || !selectedInvoice) return;
      payload = buildInvoicePayOffPayload(selectedInvoice, {
        businessId: resolvedBusinessId,
        individualId: resolvedIndividualId,
      });
      if (!payload.business_id && !payload.individual_id) return;
    } else {
      return;
    }

    onSubmit(payload);
    setFormData(buildInitialForm(userRole, allowExpense, invoices));
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
                  {modalSubtitleText(userRole, allowExpense)}
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
              {transactionTypeOptions.length <= 1 ? (
                <div className="flex flex-col">
                  <label className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#c2c8d0]">
                    Transaction type
                  </label>
                  <div className="mt-3 rounded-xl border border-[#e5eaf0] bg-[#f8fafc] px-4 py-3 text-[15px] font-semibold text-[#111827]">
                    {transactionTypeOptions[0]
                      ? typeOptionDisplayLabel(transactionTypeOptions[0])
                      : "—"}
                  </div>
                </div>
              ) : (
                <BiSelector
                  label="Transaction Type"
                  value={formData.type}
                  options={transactionTypeOptions}
                  onChange={handleTypeChange}
                  formatOptionLabel={typeOptionDisplayLabel}
                />
              )}
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
            ) : formData.type === "Invoice Pay Off" ? (
              <div className="mt-2 border-t border-[#edf1f5] pt-8">
                {!hasInvoices ? (
                  <p className="rounded-2xl bg-[#f8fafc] px-6 py-5 text-[15px] text-[#64748b]">
                    No invoices are available to pay off yet.
                  </p>
                ) : (
                  <>
                    <SelectInput
                      label="Invoice to pay off"
                      name="invoicePayOffId"
                      value={
                        formData.invoicePayOffId ||
                        String(selectedInvoice?.id ?? "")
                      }
                      onChange={handleChange}
                      options={invoices.map((inv) => ({
                        label: `${inv.Name || "Invoice"} — ${formatAmount(
                          getInvoiceTotal(inv)
                        )}`,
                        value: String(inv.id),
                      }))}
                      required
                    />

                    {selectedInvoice && (
                      <div className="mt-6 rounded-2xl bg-[#f8fafc] px-6 py-5 text-[15px] leading-7 text-[#5b6472]">
                        <p className="font-semibold text-[#111827]">
                          Lump-sum payment:{" "}
                          {formatAmount(getInvoiceTotal(selectedInvoice))}
                        </p>
                        <p className="mt-1">
                          This records a settlement for the selected invoice (same
                          pattern as choosing an expense plan to pay off).
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : null}

            <div className="mt-2 border-t border-[#edf1f5] pt-8">
              {/* <label className="flex items-center gap-3 text-[15px] font-semibold text-[#111827]">
                <input
                  type="checkbox"
                  name="balanceAdjustmentEnabled"
                  checked={formData.balanceAdjustmentEnabled}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-[#cbd5e1] text-purple-500 focus:ring-purple-300"
                />
                Adjust owner balance
              </label> */}

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
              onClick={handleSubmit}
              disabled={
                (formData.type === "Invoice Pay Off" &&
                  (!hasInvoices || !selectedInvoice)) ||
                (formData.type === "Expense-Pay Off" &&
                  (!expensePlans.length || !selectedExpensePlan))
              }
              className="rounded-full bg-[#111827] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              Create Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function getInvoiceTotal(invoice) {
  return (
    invoice?.invoice_line_items?.reduce((sum, line) => {
      const cost =
        typeof line.Cost === "number"
          ? line.Cost
          : parseAmount(String(line.Cost ?? ""));
      const qty = Number(line.Quantity) || 1;
      return sum + cost * qty;
    }, 0) || 0
  );
}

function getExpensePlanTotal(expensePlan) {
  return (
    expensePlan?.expenses?.reduce(
      (sum, expense) => sum + parseAmount(expense.cost),
      0
    ) || 0
  );
}
function buildExpensePlanPayOffPayload(expensePlan, businessId) {
  const expense_plan_total = getExpensePlanTotal(expensePlan);
  return {
    expense_plan_id: Number(expensePlan?.id),
    total_pay: expense_plan_total.toFixed(2),
    business_id: Number(businessId),
  };
}

function buildInvoicePayOffPayload(invoice, { businessId, individualId }) {
  const invoice_total = getInvoiceTotal(invoice);
  const payload = {
    invoice_id: Number(invoice?.id),
    total_pay: invoice_total.toFixed(2),
  };
  if (businessId != null) payload.business_id = Number(businessId);
  else if (individualId != null) payload.individual_id = Number(individualId);
  return payload;
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

function BiSelector({ label, value, options, onChange, formatOptionLabel }) {
  const cols = options.length;
  const labelFor = formatOptionLabel || typeOptionDisplayLabel;
  return (
    <div className="flex flex-col">
      <label className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#c2c8d0]">
        {label}
      </label>

      <div
        className="mt-3 grid gap-1 rounded-xl border border-[#e5eaf0] bg-[#f8fafc] p-1"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-lg px-2 py-2.5 text-[12px] font-semibold leading-snug transition sm:px-3 sm:text-[14px] ${
              value === option
                ? "bg-white text-[#111827] shadow-sm"
                : "text-[#64748b] hover:text-[#111827]"
            }`}
          >
            {labelFor(option)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CreateTransactionModal;
