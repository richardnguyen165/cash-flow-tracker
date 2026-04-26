import { useEffect, useRef, useState } from "react";
import ClientSidebar from "../../components/sidebar/ClientSideBar";
import MainLayout from "../../layout/MainLayout";
import { clientNav } from "../../config/workspaceNav";
import CreateTransactionModal from "../../modals/CreateTransactionModal";
import TransactionDetailsModal from "../../modals/TransactionDetailsModal";

const defaultTransactions = [
  ["Sep 28, 2023", "Invoice #8821 Payment", "Wire Transfer", "+$12,400.00"],
  ["Sep 15, 2023", "Invoice #8792 Payment", "Amex **** 1002", "+$8,500.00"],
  [
    "Sep 04, 2023",
    "Deposit - Asset Reallocation",
    "Digital Secure",
    "+$50,000.00",
  ],
];

const defaultExpensePlans = [
  {
    id: "EXP-Q2",
    title: "Expense Plan Q2",
    dueDate: "Apr 20, 2026",
    expenses: [
      {
        id: "EXPENSE-001",
        title: "Vendor Settlement",
        type: "Vendor",
        description: "Quarterly vendor account pay-off.",
        cost: "$8,400.00",
        dueBy: "Apr 20, 2026",
      },
      {
        id: "EXPENSE-002",
        title: "Operations Supplies",
        type: "Operations",
        description: "Supplies attached to the Q2 expense plan.",
        cost: "$4,400.00",
        dueBy: "Apr 20, 2026",
      },
    ],
  },
  {
    id: "EXP-VENDOR",
    title: "Vendor Payment Review",
    dueDate: "Apr 22, 2026",
    expenses: [
      {
        id: "EXPENSE-003",
        title: "Recurring Vendor Payout",
        type: "Vendor",
        description: "Approved vendor payout awaiting settlement.",
        cost: "$5,200.00",
        dueBy: "Apr 22, 2026",
      },
    ],
  },
  {
    id: "EXP-REIMB",
    title: "Employee Reimbursement Batch",
    dueDate: "Apr 30, 2026",
    expenses: [
      {
        id: "EXPENSE-004",
        title: "Employee Reimbursement",
        type: "Reimbursement",
        description: "Approved employee reimbursement batch.",
        cost: "$640.00",
        dueBy: "Apr 30, 2026",
      },
    ],
  },
];

function Payments({
  sidebar = <ClientSidebar />,
  navItems = clientNav,
  brandLink = "/dashboard",
  eyebrow = "Settlement",
  title = "Payments",
  description = "Review recent payment activity, upcoming due dates, and the channels being used to settle outstanding balances.",
  totalOutstanding = "$42,850.00",
  nextDueDate = "Oct 12, 2023",
  lastPayment = "$12,400.00",
  actionTitle = "Make a Payment",
  actionCopy = "Use your saved method or initiate a transfer to clear the next due invoice.",
  actionButton = "Open Payment Modal",
  transactions = [],
  expensePlans = [],
}) {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactionList, setTransactionList] = useState(() =>
    (Array.isArray(transactions) ? transactions : []).map(normalizeTransaction)
  );
  const lastSyncedTransactionsRef = useRef(null);

  useEffect(() => {
    const source = Array.isArray(transactions) ? transactions : [];
    const serialized = JSON.stringify(source);
    if (lastSyncedTransactionsRef.current === serialized) {
      return;
    }
    lastSyncedTransactionsRef.current = serialized;
    setTransactionList(source.map(normalizeTransaction));
  }, [transactions]);

  return (
    <MainLayout sidebar={sidebar} navItems={navItems} brandLink={brandLink}>
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b5cf6]">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[#0f172a]">
          {title}
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-[#64748b]">
          {description}
        </p>
      </section>

      {/* <section className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-[28px] border border-[#e7edf5] bg-white p-8 shadow-[0_16px_45px_rgba(15,23,42,0.04)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#94a3b8]">
            Total Outstanding
          </p>
          <h2 className="mt-5 text-5xl font-semibold tracking-tight text-[#0f172a]">
            {totalOutstanding}
          </h2>
          <div className="mt-6 flex gap-10 text-sm text-[#475569]">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#94a3b8]">
                Next Due Date
              </p>
              <p className="mt-2 font-semibold text-[#0f172a]">{nextDueDate}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#94a3b8]">
                Last Payment
              </p>
              <p className="mt-2 font-semibold text-[#0f172a]">{lastPayment}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] bg-[#1f2937] p-8 text-white shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d8b4fe]">
            Quick Action
          </p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight">
            {actionTitle}
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#d6e4ef]">
            {actionCopy}
          </p>
          <button
            type="button"
            onClick={() => setIsTransactionModalOpen(true)}
            className="mt-8 w-full rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#f4f7fb]"
          >
            {actionButton}
          </button>
        </div>
      </section> */}

      <section className="mt-8 rounded-[32px] border border-[#e7edf5] bg-white p-8 shadow-[0_16px_45px_rgba(15,23,42,0.04)]">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-[#0f172a]">
            Recent Transactions
          </h2>

          <button
            type="button"
            onClick={() => setIsTransactionModalOpen(true)}
            className="rounded-2xl bg-[#111827] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
          >
            + New Transaction
          </button>
        </div>

        <div className="mt-6 overflow-hidden rounded-[28px] border border-[#eef2f6]">
          <table className="min-w-full divide-y divide-[#eef2f6]">
            <thead className="bg-[#f8fafc]">
              <tr className="text-left text-xs uppercase tracking-[0.18em] text-[#94a3b8]">
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Description</th>
                <th className="px-6 py-4 font-semibold">Method</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef2f6] bg-white">
              {transactionList.map((transaction) => (
                <tr
                  key={transaction.id}
                  onClick={() => setSelectedTransaction(transaction)}
                  className="cursor-pointer text-sm text-[#0f172a] transition hover:bg-[#f8fafc]"
                >
                  <td className="px-6 py-5 text-[#475569]">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-5 font-medium">
                    {transaction.description}
                    {transaction.balanceAdjustment && (
                      <p className="mt-1 text-xs font-normal text-[#94a3b8]">
                        Balance {transaction.balanceAdjustment.direction}:{" "}
                        {transaction.balanceAdjustment.amount}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-5 text-[#475569]">
                    {transaction.method}
                  </td>
                  <td
                    className={`px-6 py-5 font-semibold ${
                      transaction.amount.startsWith("-")
                        ? "text-red-600"
                        : "text-[#8b5cf6]"
                    }`}
                  >
                    {transaction.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <CreateTransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        expensePlans={expensePlans}
        onSubmit={(newTransaction) => {
          setTransactionList((prev) => [newTransaction, ...prev]);
        }}
      />

      <TransactionDetailsModal
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        transaction={selectedTransaction}
      />
    </MainLayout>
  );
}

function normalizeTransaction(transaction, index) {
  if (Array.isArray(transaction)) {
    const [date, description, method, amount] = transaction;

    return {
      id: `${date}-${description}-${index}`,
      date,
      description,
      method,
      amount,
    };
  }

  return {
    id: transaction.id || `${transaction.date}-${transaction.description}-${index}`,
    ...transaction,
  };
}

export default Payments;
