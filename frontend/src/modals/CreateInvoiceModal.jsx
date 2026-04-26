import { useState } from "react";
import decodeTokens from "../services/decode-tokens";

const emptyInvoice = {
  name: "",
  counterPartyId: "",
  date: "",
  amount: "",
  status: "Unpaid",
  policyDescription: "",
  clientType: "BUSINESS",
  clientEmail: ""
};

const emptyInvoiceLine = {
  Header: "",
  Description: "",
  Quantity: "1",
  Cost: "",
};

function CreateInvoiceModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState(emptyInvoice);
  const [invoiceLines, setInvoiceLines] = useState([{ ...emptyInvoiceLine }]);

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

    const lineItems = invoiceLines.map((line, index) => ({
      Line_Number: index + 1,
      Header: line.Header,
      Description: line.Description,
      Quantity: Number(line.Quantity) || 1,
      Cost: formatAmount(line.Cost),
    }));
    const total = lineItems.reduce(
      (sum, line) => sum + parseAmount(line.Cost) * line.Quantity,
      0
    );

    const { id, User_ID, User_Role } = decodeTokens();

    const newInvoice = {
      ...formData,
      // invoiceId: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      amount: formData.amount || formatAmount(total),
      lineItems,
    };

    let Business_ID_Insert = User_Role === "BUSINESS_ADMIN" ? id : null;
    let User_ID_Insert =  User_Role === "INDIVIDUAL" ? id : null;

    const newModifiedInvoice = {
      Transaction_ID: {
        Business_ID: Business_ID_Insert,
        User_ID: User_ID_Insert, 
      },
      Name: newInvoice.name,
      Has_Paid: false,
      Policy_Description: newInvoice.policyDescription,
      CounterParty_ID: {
        CounterParty_Type: newInvoice.clientType,
        CounterParty_Email: newInvoice.clientEmail,
      },
      invoice_line_items: newInvoice.lineItems,
    }

    if (User_Role === "INDIVIDUAL"){

    } else if (User_Role === "Business")
    let result;


    onSubmit(newModifiedInvoice);
    setFormData(emptyInvoice);
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

            <div className="mt-2 border-t border-[#edf1f5] pt-8">
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
                  label="Status of Invoice"
                  name="Invoice_Status"
                  value={formData.Invoice_Status}
                  onChange={handleChange}
                  options={["Unpaid", "Paid", "Overdue"]}
                  required
                />

                <SelectInput
                  label="Type of Client"
                  name="clientType"
                  value={formData.clientType}
                  onChange={handleChange}
                  options={["BUSINESS", "INDIVIDUAL"]}
                  required
                />
              </div>
            </div>

            <div className="mt-2 border-t border-[#edf1f5] pt-8">
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
                      value={line.Header}
                      onChange={(e) =>
                        handleInvoiceLineChange(index, "Header", e.target.value)
                      }
                      placeholder="Header"
                      required
                      className="rounded-xl border border-[#e5eaf0] bg-white px-4 py-3 text-[15px] font-medium text-[#111827] outline-none transition placeholder:text-[#aab2bf] focus:border-purple-300 focus:ring-4 focus:ring-purple-50"
                    />
                    <input
                      value={line.Quantity}
                      onChange={(e) =>
                        handleInvoiceLineChange(
                          index,
                          "Quantity",
                          e.target.value
                        )
                      }
                      placeholder="Qty"
                      required
                      className="rounded-xl border border-[#e5eaf0] bg-white px-4 py-3 text-[15px] font-medium text-[#111827] outline-none transition placeholder:text-[#aab2bf] focus:border-purple-300 focus:ring-4 focus:ring-purple-50"
                    />
                    <input
                      value={line.Cost}
                      onChange={(e) =>
                        handleInvoiceLineChange(index, "Cost", e.target.value)
                      }
                      placeholder="Cost"
                      required
                      className="rounded-xl border border-[#e5eaf0] bg-white px-4 py-3 text-[15px] font-medium text-[#111827] outline-none transition placeholder:text-[#aab2bf] focus:border-purple-300 focus:ring-4 focus:ring-purple-50"
                    />
                    <textarea
                      value={line.Description}
                      onChange={(e) =>
                        handleInvoiceLineChange(
                          index,
                          "Description",
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

            <div className="mt-2 border-t border-[#edf1f5] pt-8">
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
