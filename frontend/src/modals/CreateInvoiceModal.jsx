import { useState } from "react";

const emptyInvoice = {
  name: "",
  counterPartyId: "",
  date: "",
  amount: "",
  status: "Unpaid",
  lineHeader: "",
  quantity: "",
  lineCost: "",
  lineDescription: "",
  policyDescription: "",
};

function CreateInvoiceModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState(emptyInvoice);

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newInvoice = {
      ...formData,
      invoiceId: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      amount:
        formData.amount || `$${Number(formData.lineCost || 0).toFixed(2)}`,
    };

    onSubmit(newInvoice);
    setFormData(emptyInvoice);
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
                  New Invoice
                </p>

                <h2 className="mt-5 text-[32px] font-semibold leading-tight tracking-[-0.02em] text-[#111827]">
                  Create Invoice
                </h2>

                <p className="mt-2 text-[15px] text-[#9ca3af]">
                  Enter the invoice and line item details below.
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

            <div className="mt-8 border-t border-[#edf1f5] pt-8">
              <div className="grid grid-cols-1 gap-x-16 gap-y-6 md:grid-cols-2">
                <FormInput
                  label="Invoice Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="April Services Invoice"
                  required
                />

                <DateInput
                  label="Invoice Date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />

                <FormInput
                  label="Counterparty ID"
                  name="counterPartyId"
                  value={formData.counterPartyId}
                  onChange={handleChange}
                  placeholder="1"
                  required
                />

                <FormInput
                  label="Amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="$18,200.00"
                  required
                />

                <SelectInput
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  options={["Unpaid", "Paid", "Overdue"]}
                />

                <FormInput
                  label="Line Header"
                  name="lineHeader"
                  value={formData.lineHeader}
                  onChange={handleChange}
                  placeholder="Consulting Services"
                  required
                />

                <FormInput
                  label="Quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="1"
                  required
                />

                <FormInput
                  label="Line Cost"
                  name="lineCost"
                  value={formData.lineCost}
                  onChange={handleChange}
                  placeholder="18200.00"
                  required
                />
              </div>
            </div>

            <div className="mt-8 border-t border-[#edf1f5] pt-8">
              <label className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#c2c8d0]">
                Line Description
              </label>

              <textarea
                name="lineDescription"
                value={formData.lineDescription}
                onChange={handleChange}
                rows={5}
                placeholder="Describe what this invoice line covers."
                className="mt-4 w-full resize-none rounded-2xl border border-[#e5eaf0] bg-[#f8fafc] px-6 py-5 text-[15px] leading-8 text-[#5b6472] outline-none transition placeholder:text-[#aab2bf] focus:border-purple-300 focus:ring-4 focus:ring-purple-50"
              />
            </div>

            <div className="mt-8 border-t border-[#edf1f5] pt-8">
              <label className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#c2c8d0]">
                Payment Policy
              </label>

              <textarea
                name="policyDescription"
                value={formData.policyDescription}
                onChange={handleChange}
                rows={5}
                placeholder="Add payment terms, approval notes, or invoice policy details."
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
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
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

function SelectInput({ label, name, value, onChange, options }) {
  return (
    <div className="flex flex-col">
      <label className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#c2c8d0]">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="mt-3 rounded-xl border border-[#e5eaf0] bg-white px-4 py-3 text-[15px] font-medium text-[#111827] outline-none transition focus:border-purple-300 focus:ring-4 focus:ring-purple-50"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default CreateInvoiceModal;
