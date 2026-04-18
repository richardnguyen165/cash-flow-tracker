import {
  DocumentTextIcon,
  ReceiptPercentIcon,
  CreditCardIcon,
  UsersIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import WorkspaceSidebar from "./WorkspaceSidebar";

function BusinessSideBar() {
  const navItems = [
    { to: "/business/contracts", label: "Contracts", Icon: DocumentTextIcon },
    { to: "/business/invoices", label: "Invoices", Icon: ReceiptPercentIcon },
    { to: "/business/payments", label: "Payments", Icon: CreditCardIcon },
    { to: "/business/employees", label: "Employees", Icon: UsersIcon },
    { to: "/business/profile", label: "Profile", Icon: UserCircleIcon },
  ];

  return (
    <WorkspaceSidebar
      userName="Northshore Capital"
      subtitle="Business Workspace"
      meta="Signed in as Business Admin"
      navItems={navItems}
      summaryLabel="Company Balance"
      summaryValue="$2,400,000"
      summaryHint="Active contracts, billed work, and approved expenses"
    />
  );
}

export default BusinessSideBar;
