import InvoiceStatusBadge from "../components/cards/InvoiceStatusBadge";

function InvoiceDetailsModal({ isOpen, onClose, invoice }) {
  if (!isOpen) return null;

  const status = invoice?.status || "Unpaid";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[82vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-white shadow-2xl">
        <div className="p-8">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <p className="inline-flex rounded-full bg-purple-50 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-purple-500">
                Invoice Details
              </p>

              <h2 className="mt-5 text-[32px] font-semibold leading-tight tracking-[-0.02em] text-[#111827]">
                {invoice?.name || "Invoice"}
              </h2>

              <p className="mt-2 text-[15px] text-[#9ca3af]">
                Invoice ID: {invoice?.invoiceId || invoice?.id || "INV-0000"}
              </p>
            </div>

            <button
              onClick={onClose}
              className="mt-1 shrink-0 text-3xl font-light leading-none text-gray-400 transition hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <div className="mt-2 border-t border-[#edf1f5] pt-8">
            <div className="grid grid-cols-1 gap-x-16 gap-y-8 md:grid-cols-2">
              <InfoBlock
                label="Invoice Name"
                value={invoice?.name || "September Retainer Invoice"}
              />

              <InfoBlock
                label="Invoice Date"
                value={invoice?.date || "Sep 15, 2023"}
              />

              <InfoBlock
                label="Amount"
                value={invoice?.amount || "$0.00"}
              />

              <div className="flex flex-col">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#c2c8d0]">
                  Status
                </p>

                <div className="mt-3">
                  <InvoiceStatusBadge status={status} />
                </div>
              </div>

              <InfoBlock
                label="Counterparty ID"
                value={invoice?.counterPartyId || "1"}
              />
            </div>
          </div>

          <div className="mt-2 border-t border-[#edf1f5] pt-8">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#c2c8d0]">
              Invoice Line
            </p>

            <div className="mt-4 rounded-2xl bg-[#f8fafc] px-6 py-5 text-[15px] leading-8 text-[#5b6472]">
              <p className="font-semibold text-[#111827]">
                {invoice?.lineHeader || "Service Fee"}
              </p>

              <p className="mt-2">
                {invoice?.lineDescription ||
                  "This line item covers the services, deliverables, or billable work associated with this invoice."}
              </p>

              <p className="mt-3 text-sm text-[#64748b]">
                Quantity: {invoice?.quantity || "1"} · Cost:{" "}
                {invoice?.lineCost || invoice?.amount || "$0.00"}
              </p>
            </div>
          </div>

          <div className="mt-2 border-t border-[#edf1f5] pt-8">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#c2c8d0]">
              Payment Policy
            </p>

            <div className="mt-4 rounded-2xl bg-[#f8fafc] px-6 py-5 text-[15px] leading-8 text-[#5b6472]">
              {invoice?.policyDescription ||
                "Payment is expected according to the terms listed on the invoice. Any overdue balance may remain marked as unpaid until the full amount has been settled and recorded by the business."}
            </div>
          </div>
        </div>

        <div className="border-t border-[#edf1f5] bg-[#fafbfc] px-8 py-4 text-center text-[12px] font-medium text-[#c2c8d0]">
          Invoice ID: {invoice?.invoiceId || invoice?.id || "INV-0000"}
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

export default InvoiceDetailsModal;