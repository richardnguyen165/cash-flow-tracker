import { useEffect, useState } from "react";
import EmployeeSideBar from "../../components/sidebar/EmployeeSideBar";
import Payments from "./Payments";
import { employeeNav } from "../../config/workspaceNav";
import { fetchEmployeeProfile, fetchEmployeeTransactions } from "../../services/employeeWorkspace";

function EmployeePayments() {
  const [transactions, setTransactions] = useState([]);
  const [employeePay, setEmployeePay] = useState("0.00");
  const [latestPaymentDate, setLatestPaymentDate] = useState("No recorded payment yet");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEmployeePayments() {
      try {
        const profile = await fetchEmployeeProfile();
        const transactionData = await fetchEmployeeTransactions(profile.business.id);

        setEmployeePay(profile.employee.Pay ?? "0.00");

        const normalizedTransactions = transactionData.map((transaction) => ([
          transaction.Transaction_Date,
          `Employee transaction #${transaction.id}`,
          "Recorded in business ledger",
          `$${profile.employee.Pay ?? "0.00"}`,
        ]));

        setTransactions(normalizedTransactions);

        if (normalizedTransactions.length > 0) {
          setLatestPaymentDate(normalizedTransactions[0][0]);
        }
      } catch (error) {
        console.error("Could not load employee payment history.", error);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    }

    loadEmployeePayments();
  }, []);

  return (
    <Payments
      sidebar={<EmployeeSideBar />}
      navItems={employeeNav}
      brandLink="/employee/dashboard"
      eyebrow="Compensation"
      title="Payment History"
      description={
        loading
          ? "Loading the transaction history tied to your employee account..."
          : "Review the transactions that have been recorded under your employee account."
      }
      totalOutstanding={`$${employeePay}`}
      nextDueDate="Handled by business admin"
      lastPayment={latestPaymentDate}
      actionTitle="Payroll Notes"
      actionCopy="Use this page to review wage and reimbursement history recorded for your employee account."
      actionButton="View Payroll Detail"
      transactions={transactions}
    />
  );
}

export default EmployeePayments;
