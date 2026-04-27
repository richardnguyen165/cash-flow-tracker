import { useEffect, useState } from "react";
import ClientSidebar from "../../components/sidebar/ClientSideBar";
import Payments from "./Payments";
import { clientNav } from "../../config/workspaceNav";
import decodeTokens from "../../services/decode-tokens";
import api from "../../services/api";
import { fetchIndividualInvoices } from "../../services/individualWorkspace";

function IndividualPayments() {
  const [transactions, setTransactions] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [latestPaymentDate, setLatestPaymentDate] = useState("No recorded payment yet");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadIndividualPayments() {
      try {
        const decoded = decodeTokens();
        if (!decoded) {
          setTransactions([]);
          setInvoices([]);
          return;
        }
        const userId = decoded.User_ID ?? decoded.user_id;
        const individualId = decoded.id ?? decoded.user_id;

        const [txnResponse, invoiceData] = await Promise.all([
          api.get(`api/indiv/transactions/get/${individualId}`),
          fetchIndividualInvoices(userId),
        ]);

        const transactionData = Array.isArray(txnResponse.data) ? txnResponse.data : [];
        setInvoices(Array.isArray(invoiceData) ? invoiceData : []);

        const normalizedTransactions = transactionData.map((transaction) => [
          transaction.Transaction_Date || "N/A",
          `Transaction #${transaction.id ?? "N/A"}`,
          "Recorded in account ledger",
          "$0.00",
        ]);

        setTransactions(normalizedTransactions);

        // Get our latest payment / transaction
        if (normalizedTransactions.length > 0) {
          setLatestPaymentDate(normalizedTransactions[0][0]);
        }
      } catch (error) {
        console.error("Could not load individual payment history.", error);
        setTransactions([]);
        setInvoices([]);
      } finally {
        setLoading(false);
      }
    }

    loadIndividualPayments();
  }, []);

  const decoded = decodeTokens();
  const userRole = decoded?.User_Role ?? null;
  const individualId = decoded?.id ?? null;

  return (
    <Payments
      sidebar={<ClientSidebar />}
      navItems={clientNav}
      brandLink="/dashboard"
      eyebrow="Settlement"
      title="My Payments"
      description={
        loading
          ? "Loading payments/transactions from your account..."
          : "Review transactions that have been recorded for your individual account."
      }
      totalOutstanding="$0.00"
      nextDueDate="No due date available"
      lastPayment={latestPaymentDate}
      actionTitle="Record Payment"
      actionCopy="Use this page to review payment records and manually log new transaction entries."
      actionButton="Open Payment Modal"
      transactions={transactions}
      invoices={invoices}
      allowExpense={false}
      userRole={userRole}
      individualId={individualId}
    />
  );
}

export default IndividualPayments;
