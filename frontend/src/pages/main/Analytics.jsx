import ClientSidebar from "../../components/sidebar/ClientSideBar";
import MainLayout from "../../layout/MainLayout";

function Analytics() {
  return (
    <MainLayout sidebar={<ClientSidebar />}>
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b5cf6]">
          Reporting
        </p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[#0f172a]">
          Analytics
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-[#64748b]">
          This section will surface the cash flow views that matter most:
          outstanding balance trends, invoice aging, settlement timing, and
          payment completion patterns.
        </p>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Invoice aging",
            body: "Track which receivables are current, approaching due date, or already overdue.",
          },
          {
            title: "Payment velocity",
            body: "Compare how quickly invoices are being settled across clients and time periods.",
          },
          {
            title: "Monthly movement",
            body: "See whether billed amounts, payments, and open balances are moving in a healthy direction.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-[28px] border border-[#e7edf5] bg-white p-7 shadow-[0_12px_35px_rgba(15,23,42,0.04)]"
          >
            <h2 className="text-xl font-semibold tracking-tight text-[#0f172a]">
              {card.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#64748b]">{card.body}</p>
          </div>
        ))}
      </section>
    </MainLayout>
  );
}

export default Analytics;
