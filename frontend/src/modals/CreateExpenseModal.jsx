import { useState } from "react";

const emptyExpense = {
  Expense_Plan_ID: "",
  Expense_Title: "",
  Expense_Type: "",
  Cost: "",
  Description: "",
  Expense_Due_By: "",
};

function CreateExpenseModal({
  isOpen,
  onClose,
  onSubmit,
  expensePlans = [],
  expensePlan,
}) {
  const [formData, setFormData] = useState(emptyExpense);

  if (!isOpen) return null;

  const selectedPlan = expensePlans.find(
    (plan) => plan.id === formData.Expense_Plan_ID
  ) || expensePlan;

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const plan = expensePlan || selectedPlan || expensePlans[0];
    const newExpense = {
      id: `EXP-${Date.now()}`,
      ...formData,
      Expense_Plan_ID: formData.Expense_Plan_ID || plan?.id || "",
      Plan_Title: plan?.Plan_Title || plan?.title || "Expense Plan",
      Cost: formatAmount(formData.Cost),
      Expense_Date_Issued: formatDate(new Date()),
      status: "Available for pay-off",
    };

    onSubmit(newExpense);
    setFormData(emptyExpense);
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
                  New Expense
                </p>

                <h2 className="mt-5 text-[32px] font-semibold leading-tight tracking-[-0.02em] text-[#111827]">
                  Create Expense
                </h2>

                <p className="mt-2 text-[15px] text-[#9ca3af]">
                  Add an expense under an available expense plan.
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
              <div className="grid grid-cols-1 gap-x-16 gap-y-6 md:grid-cols-2">
                {expensePlan ? (
                  <ReadOnlyField
                    label="Expense Plan"
                    value={expensePlan.Plan_Title}
                  />
                ) : (
                  <SelectInput
                    label="Expense Plan"
                    name="Expense_Plan_ID"
                    value={formData.Expense_Plan_ID || expensePlans[0]?.id || ""}
                    onChange={handleChange}
                    options={expensePlans.map((plan) => ({
                      label: plan.Plan_Title || plan.title,
                      value: plan.id,
                    }))}
                    required
                  />
                )}

                <DateInput
                  label="Due By"
                  name="Expense_Due_By"
                  value={formData.Expense_Due_By}
                  onChange={handleChange}
                  required
                />

                <FormInput
                  label="Expense Title"
                  name="Expense_Title"
                  value={formData.Expense_Title}
                  onChange={handleChange}
                  placeholder="Vendor Settlement"
                  required
                />

                <FormInput
                  label="Expense Type"
                  name="Expense_Type"
                  value={formData.Expense_Type}
                  onChange={handleChange}
                  placeholder="Vendor"
                  required
                />

                <FormInput
                  label="Cost"
                  name="Cost"
                  value={formData.Cost}
                  onChange={handleChange}
                  placeholder="$5,200.00"
                  required
                />
              </div>
            </div>

            <div className="mt-2 border-t border-[#edf1f5] pt-8">
              <label className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#c2c8d0]">
                Description
              </label>

              <textarea
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe what this expense covers."
                className="mt-4 w-full resize-none rounded-2xl border border-[#e5eaf0] bg-[#f8fafc] px-6 py-5 text-[15px] leading-8 text-[#5b6472] outline-none transition placeholder:text-[#aab2bf] focus:border-purple-300 focus:ring-4 focus:ring-purple-50"
              />
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
              Create Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function parseAmount(value) {
  const parsed = Number(String(value).replace(/[^0-9.-]/g, ""));

  return Number.isFinite(parsed) ? parsed : 0;
}

function formatAmount(value) {
  return parseAmount(value).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
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

function DateInput({ label, name, value, onChange, required = false }) {
  return (
    <div className="flex flex-col">
      <label className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#c2c8d0]">
        {label}
      </label>

      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-3 rounded-xl border border-[#e5eaf0] bg-white px-4 py-3 text-[15px] font-medium text-[#111827] outline-none transition focus:border-purple-300 focus:ring-4 focus:ring-purple-50"
      />
    </div>
  );
}

function ReadOnlyField({ label, value }) {
  return (
    <div className="flex flex-col">
      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#c2c8d0]">
        {label}
      </p>
      <p className="mt-3 rounded-xl border border-[#e5eaf0] bg-[#f8fafc] px-4 py-3 text-[15px] font-medium text-[#111827]">
        {value}
      </p>
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

export default CreateExpenseModal;
