import { useEffect, useState } from "react";
import Payments from "./Payments";
import BusinessSideBar from "../../components/sidebar/BusinessSideBar";
import { businessAdminNav } from "../../config/workspaceNav";
import decodeTokens from "../../services/decode-tokens";
import api from "../../services/api";
import { fetchBusinessInvoices } from "../../services/businessWorkspace";

const fallbackExpensePlans = [
  {
    id: 1,
    title: "Expense Plan Q2",
    expenses: [{ id: 1, cost: "$12,800.00" }],
  },
];

function BusinessPayments() {
  const [transactions, setTransactions] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [expensePlans, setExpensePlans] = useState(fallbackExpensePlans);
  const [latestPaymentDate, setLatestPaymentDate] = useState("No recorded payment yet");
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    async function loadBusinessPayments() {
      try {

        const result = decodeTokens();
        setUserRole(result.User_Role);
        let businessId;
        if (result.User_Role === "BUSINESS") {
          businessId = result.id;
        } else {
          businessId = result.business_id;
        }

        const [transResponse, invoiceData, expensePlanResponse] = await Promise.all([
          api.get(`api/business/transactions/get/${businessId}`),
          fetchBusinessInvoices(businessId),
          api.get(`api/business/expense-plans/get/${businessId}`),
        ]);

        const transactionData = Array.isArray(transResponse.data) ? transResponse.data : [];
        const invoiceRows = Array.isArray(invoiceData) ? invoiceData : [];
        const expensePlanRows = Array.isArray(expensePlanResponse.data)
          ? expensePlanResponse.data
          : [];

        setInvoices(invoiceRows);
        setExpensePlans(expensePlanRows.length > 0 ? expensePlanRows : fallbackExpensePlans);

        const normalizedTransactions = transactionData.map((transaction) => [
          transaction.Transaction_Date || "N/A",
          transaction.description || `Transaction #${transaction.id ?? "N/A"}`,
          transaction.method || "Recorded in business ledger",
          transaction.amount || "$0.00",
        ]);

        setTransactions(normalizedTransactions);
        if (normalizedTransactions.length > 0) {
          setLatestPaymentDate(normalizedTransactions[0][0]);
        }
      } catch (error) {
        console.error("Could not load business payment history.", error);
        setTransactions([]);
        setInvoices([]);
        setExpensePlans(fallbackExpensePlans);
      } finally {
        setLoading(false);
      }
    }

    loadBusinessPayments();
  }, []);

  const decoded = decodeTokens();
  const businessId = decoded?.business_id ?? null;

  return (
    <Payments
      sidebar={<BusinessSideBar />}
      navItems={businessAdminNav}
      brandLink="/business/dashboard"
      eyebrow="Treasury"
      title="Business Payments"
      description={
        loading
          ? "Loading payments/transactions for your business account..."
          : "Monitor payments collected from clients and outgoing settlements tied to business obligations."
      }
      totalOutstanding="$0.00"
      nextDueDate="No due date available"
      lastPayment={latestPaymentDate}
      actionTitle="Review Payment"
      actionCopy="Approve or record settlements that affect your business cash flow."
      actionButton="Open Payment Modal"
      transactions={transactions}
      invoices={invoices}
      expensePlans={expensePlans}
      allowExpense
      userRole={userRole}
      businessId={businessId}
    />
  );
}

export default BusinessPayments;
