import ClientSidebar from "../../components/sidebar/ClientSideBar";
import MainLayout from "../../layout/MainLayout";
import MetricCard from "../../components/cards/MetricCard";
import decodeTokens from "../../services/decode-tokens";
import { useEffect, useState } from "react";

function Dashboard() {
  
  const [indivID, setIndivID] = useState(null);
  const [indivRole, setIndivRole] = useState(null);

  useEffect(() => {
    const decodedToken = decodeTokens();
    const { indiv_id, indiv_role } = decodedToken;
    setIndivID(indiv_id);
    setIndivRole(indiv_role);
  }, []);

  const activeContracts = [];

  return (
    <MainLayout sidebar={<ClientSidebar />}>
      <section>
        <h1 className="text-5xl font-semibold tracking-tight text-black">
          Overview
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-[#4b5563]">
          Welcome back. Here is a summary of your contracts, invoices, and
          recent payment activity.
        </p>
      </section>

      <section className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-[28px] border border-[#efeafc] bg-[#f6efff] p-8 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6b7280]">
            Total Outstanding Balance
          </p>
          <h2 className="mt-5 text-6xl font-semibold tracking-tight text-black">
            $412,450.00
          </h2>

          {/* <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-2xl bg-[#111827] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black">
              Pay Outstanding
            </button>
          </div> */}
        </div>

        {/* <div className="rounded-[28px] border border-[#ececf2] bg-white p-8 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6b7280]">
            Pending Review
          </p>
          <p className="mt-5 text-sm text-[#4b5563]">6 items require action</p>
          <h3 className="mt-2 text-5xl font-semibold tracking-tight text-[#8b5cf6]">
            06
          </h3>
          <p className="mt-8 text-xs uppercase tracking-[0.16em] text-[#9ca3af]">
            Last synced today at 9:24 AM
          </p>
        </div> */}
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <MetricCard
          label="Active Contracts"
          value="04"
          subtitle="Commercial agreements currently in force"
          compact
        />
        <MetricCard
          label="Total Invoices Received"
          value="11"
          subtitle="Invoices received from outgoing contracts"
          compact
        />
        {/* <MetricCard
          label="Recent Payments"
          value="$96.4K"
          subtitle="Settled in the last 30 days"
          compact
          accent="text-[#8b5cf6]"
        /> */}
      </section>

      <section className="mt-8 rounded-[32px] border border-[#e7edf5] bg-white p-8 shadow-[0_16px_45px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-[#0f172a]">
              My Contracts
            </h2>
            <p className="mt-1 text-sm text-[#64748b]">
              Keep track of agreements that are active, in review, or waiting on action.
            </p>
          </div>
          {/* <button className="rounded-2xl bg-[#111827] px-5 py-3 text-sm font-semibold text-white transition hover:bg-black">
            New Contract
          </button> */}
        </div>

        <div className="mt-6 overflow-hidden rounded-[28px] border border-[#eef2f6]">
          <table className="min-w-full divide-y divide-[#eef2f6]">
            <thead className="bg-[#f8fafc]">
              <tr className="text-left text-xs uppercase tracking-[0.18em] text-[#94a3b8]">
                <th className="px-6 py-4 font-semibold">Agreement</th>
                <th className="px-6 py-4 font-semibold">Next Action</th>
                <th className="px-6 py-4 font-semibold">Due Date</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef2f6] bg-white">
              {activeContracts.map((contract) => (
                <tr key={contract.name} className="text-sm text-[#0f172a]">
                  <td className="px-6 py-5 font-medium">{contract.name}</td>
                  <td className="px-6 py-5 text-[#475569]">
                    {contract.nextAction}
                  </td>
                  <td className="px-6 py-5 text-[#475569]">{contract.dueDate}</td>
                  <td className="px-6 py-5 font-semibold">{contract.amount}</td>
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${contract.statusClass}`}
                    >
                      {contract.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </MainLayout>
  );
}

export default Dashboard;
