import { useState } from "react";

const emptyContract = {
  name: "",
  dueDate: "",
  amount: "",
  status: "In Review",
  clientEmail: "",
  clientType: "Individual",
  description: "",
};

function CreateContractModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState(emptyContract);

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

    const newContract = {
      ...formData,
      authMethod: "Digital Signature",
      agreementId: `TR-${Date.now()}`,
      description:
        formData.description ||
        "This agreement sets forth the terms and conditions under which the business will provide services to the client, including the scope of work, payment obligations, approval procedures, and ongoing responsibilities of both parties. It outlines the timing of deliverables, billing and collection expectations, requirements for written authorization, and the procedures for handling amendments, delays, disputes, or termination.",
    };

    onSubmit(newContract);
    setFormData(emptyContract);
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
                  New Contract
                </p>

                <h2 className="mt-5 text-[32px] font-semibold leading-tight tracking-[-0.02em] text-[#111827]">
                  Create Contract Agreement
                </h2>

                <p className="mt-2 text-[15px] text-[#9ca3af]">
                  Enter the contract details below.
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
                <FormInput
                  label="Contract Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Capital Advisory Master Agreement"
                  required
                />

                <DateInput
                  label="Due Date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />

                <FormInput
                  label="Amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="$84,210.00"
                  required
                />

                <FormInput
                  label="Client Email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleChange}
                  placeholder="client@email.com"
                  type="email"
                  required
                />

                <BiSelector
                  label="Contract Type"
                  name="clientType"
                  value={formData.clientType}
                  onChange={handleChange}
                  options={["Individual", "Business"]}
                />
              </div>
            </div>

            <div className="mt-2 border-t border-[#edf1f5] pt-8">
              <label className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#c2c8d0]">
                Contract Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={7}
                placeholder="This agreement sets forth the terms and conditions under which the business will provide services to the client..."
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
              Create Contract
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
  type = "text",
  required = false,
}) {
  return (
    <div className="flex flex-col">
      <label className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#c2c8d0]">
        {label}
      </label>

      <input
        type={type}
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

function BiSelector({ label, name, value, onChange, options }) {
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
            onClick={() =>
              onChange({
                target: {
                  name,
                  value: option,
                },
              })
            }
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

export default CreateContractModal;
