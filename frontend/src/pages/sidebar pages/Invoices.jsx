import { useEffect, useState } from "react";
import { clientNav } from "../../config/workspaceNav";
import ClientSidebar from "../../components/sidebar/ClientSideBar";
import MainLayout from "../../layout/MainLayout";
import InvoiceCard from "../../components/cards/InvoiceCard";
import CreateInvoiceModal from "../../modals/CreateInvoiceModal";
import InvoiceDetailsModal from "../../modals/InvoiceDetailsModal";

const defaultInvoices = [
  {
    invoiceId: "INV-8929",
    name: "October Services Invoice",
    date: "Oct 01, 2023",
    amount: "$18,200.00",
    status: "Overdue",
    lineItems: [
      {
        Line_Number: 1,
        Header: "Consulting Services",
        Description: "Monthly advisory services and account review.",
        Quantity: 1,
        Cost: "$12,000.00",
      },
      {
        Line_Number: 2,
        Header: "Implementation Support",
        Description: "Operational support for October service changes.",
        Quantity: 1,
        Cost: "$6,200.00",
      },
    ],
  },
  {
    invoiceId: "INV-8714",
    name: "September Advisory Invoice",
    date: "Sep 28, 2023",
    amount: "$6,250.00",
    status: "Unpaid",
    lineItems: [
      {
        Line_Number: 1,
        Header: "Advisory Review",
        Description: "Portfolio review and reporting preparation.",
        Quantity: 1,
        Cost: "$6,250.00",
      },
    ],
  },
  {
    invoiceId: "INV-8650",
    name: "September Retainer Invoice",
    date: "Sep 15, 2023",
    amount: "$12,000.00",
    status: "Paid",
    lineItems: [
      {
        Line_Number: 1,
        Header: "Monthly Retainer",
        Description: "Fixed retainer for September services.",
        Quantity: 1,
        Cost: "$12,000.00",
      },
    ],
  },
];

function Invoices({
  sidebar = <ClientSidebar />,
  navItems = clientNav,
  brandLink = "/dashboard",
  eyebrow = "Invoices",
  title = "Invoices",
  description = "Review invoice history, pending approval items, and the balances that still need to be settled. Do note that when you create an invoice, it appears at the receiver, not the sender! (So if you create a new invoice, it will not be here).",
  summaryCards = [
    // ["Total Outstanding", "$24,450.00", "Across all open invoices"],
    // ["Pending Review", "02", "Waiting on approval"],
    // ["Last Paid", "$12,000.00", "Settled Sep 15, 2023"],
  ],
  invoices = defaultInvoices,
  tableTitle = "Invoice History",
  allowCreateInvoice = true
}) {


  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);
  const [invoiceList, setInvoiceList] = useState([]);

  useEffect(() => {
    setInvoiceList(invoices);
  }, [invoices]);

  return (
    <MainLayout sidebar={sidebar} navItems={navItems} brandLink={brandLink}>
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b5cf6]">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[#0f172a]">
          {title}
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-[#64748b]">{description}</p>
      </section>

      {/* <section className="mt-10 grid gap-6 md:grid-cols-3">
        {summaryCards.map(([cardTitle, value, subtitle]) => (
          <SummaryCard
            key={cardTitle}
            title={cardTitle}
            value={value}
            subtitle={subtitle}
          />
        ))}
      </section> */}
      <InvoiceCard
        title={tableTitle}
        invoices={invoiceList}
        onRowClick={(invoice) => setSelectedInvoice(invoice)}
        actionButton={
          <button
            type="button"
            onClick={() => setIsCreateInvoiceOpen(true)}
            className="rounded-2xl bg-[#111827] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
          >
            + New Invoice
          </button>
        }
      />
      <CreateInvoiceModal
        isOpen={isCreateInvoiceOpen}
        onClose={() => setIsCreateInvoiceOpen(false)}
      />

      <InvoiceDetailsModal
        isOpen={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        invoice={selectedInvoice}
      />
    </MainLayout>
  );
}

function SummaryCard({ title, value, subtitle }) {
  return (
    <div className="rounded-[28px] border border-[#e7edf5] bg-white p-7 shadow-[0_12px_35px_rgba(15,23,42,0.04)]">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#94a3b8]">
        {title}
      </p>
      <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#0f172a]">
        {value}
      </h2>
      <p className="mt-3 text-sm text-[#64748b]">{subtitle}</p>
    </div>
  );
}

export default Invoices;
