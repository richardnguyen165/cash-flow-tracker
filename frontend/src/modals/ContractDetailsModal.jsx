import StatusBadge from "../components/cards/StatusBadge";

function ContractDetailsModal({ isOpen, onClose, contract }) {
  if (!isOpen) return null;
  const status = contract?.Contract_Status || "In Review";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[82vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-white shadow-2xl">
        <div className="p-8">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <p className="inline-flex rounded-full bg-purple-50 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-purple-500">
                Contract Details
              </p>

              <h2 className="mt-5 text-[32px] font-semibold leading-tight tracking-[-0.02em] text-[#111827]">
                {contract?.Contract_Name || "Contract Agreement"}
              </h2>

              <p className="mt-2 text-[15px] text-[#9ca3af]">
                Agreement ID: {contract?.id || "N/A"}
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
                label="Contract Name"
                value={contract?.Contract_Name || "N/A"}
              />

              <InfoBlock
                label="Due Date"
                value={
                  contract?.Contract_Completion_Date | "N/A"
                }
              />

              <InfoBlock label="Amount" value={contract?.Contract_Cost ? `$${contract.Contract_Cost}` : "$0.00"} />

              <div className="flex flex-col">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#c2c8d0]">
                  Status
                </p>

                <div className="mt-3">
                  <StatusBadge status={status} />
                </div>
              </div>

              {/* <InfoBlock
                label="Auth Method"
                value={contract?.authMethod || "Digital Signature"}
              /> */}
            </div>
          </div>

          <div className="mt-2 border-t border-[#edf1f5] pt-8">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#c2c8d0]">
              Contract Terms
            </p>

            <div className="mt-4 rounded-2xl bg-[#f8fafc] px-6 py-5 text-[15px] leading-8 text-[#5b6472]">
              {contract?.Contract_Terms ||
                "This agreement sets forth the terms and conditions under which the business will provide services to the client, including the scope of work, payment obligations, approval procedures, and ongoing responsibilities of both parties. It outlines the timing of deliverables, billing and collection expectations, requirements for written authorization, and the procedures for handling amendments, delays, disputes, or termination. Both parties acknowledge that all services, communications, and payments made under this agreement must comply with the agreed commercial terms and any supporting schedules or documents incorporated into the contract."}
            </div>
          </div>
        </div>

        <div className="border-t border-[#edf1f5] bg-[#fafbfc] px-8 py-4 text-center text-[12px] font-medium text-[#c2c8d0]">
          Agreement ID: {contract?.agreementId || "TR-8842-AXL-003"}
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

export default ContractDetailsModal;
