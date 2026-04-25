import ClientSidebar from "../../components/sidebar/ClientSideBar";
import MainLayout from "../../layout/MainLayout";
import MetricCard from "../../components/cards/MetricCard";
import ContractsCard from "../../components/cards/ContractsCard";

function Dashboard() {
  const activeContracts = [
    {
      name: "Capital Advisory Master Agreement",
      dueDate: "Apr 22, 2026",
      amount: "$84,210.00",
      status: "In Review",
    },
    {
      name: "Equity Participation Clause",
      dueDate: "Apr 25, 2026",
      amount: "$250,000.00",
      status: "In Review",
    },
    {
      name: "Commercial Escrow Agreement",
      dueDate: "Apr 30, 2026",
      amount: "$42,500.00",
      status: "Active",
    },
  ];

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

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-2xl bg-[#111827] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black">
              Pay Outstanding
            </button>
          </div>
        </div>

        <div className="rounded-[28px] border border-[#ececf2] bg-white p-8 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
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
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <MetricCard
          label="Active Contracts"
          value="04"
          subtitle="Commercial agreements currently in force"
          compact
        />
        <MetricCard
          label="Open Invoices"
          value="11"
          subtitle="Across current clients and retained services"
          compact
        />
        <MetricCard
          label="Recent Payments"
          value="$96.4K"
          subtitle="Settled in the last 30 days"
          compact
          accent="text-[#8b5cf6]"
        />
      </section>

      <ContractsCard
        title="My Contracts"
        subtitle="Keep track of agreements that are active, in review, or completed."
        contracts={activeContracts}
      />
    </MainLayout>
  );
}

export default Dashboard;
