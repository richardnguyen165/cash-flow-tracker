import {
  DocumentTextIcon,
  BanknotesIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import WorkspaceSidebar from "./WorkspaceSidebar";

function EmployeeSideBar() {
  const navItems = [
    { to: "/employee/contracts", label: "Assigned Contracts", Icon: DocumentTextIcon },
    { to: "/employee/expenses", label: "Expense Tasks", Icon: ClipboardDocumentListIcon },
    { to: "/employee/payments", label: "Payment History", Icon: BanknotesIcon },
    { to: "/employee/profile", label: "Profile", Icon: UserCircleIcon },
  ];

  return (
    <WorkspaceSidebar
      userName="Maya Torres"
      subtitle="Employee Workspace"
      meta="Northshore Capital - Operations Analyst"
      navItems={navItems}
      summaryLabel="Pending Tasks"
      summaryValue="05"
      summaryHint="Line items to log, expenses to review, and assigned contract work"
    />
  );
}

export default EmployeeSideBar;