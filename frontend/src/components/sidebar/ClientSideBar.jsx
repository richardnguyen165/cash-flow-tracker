import {
  DocumentTextIcon,
  ReceiptPercentIcon,
  CreditCardIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import WorkspaceSidebar from "./WorkspaceSidebar";

function ClientSidebar() {
  const navItems = [
    { to: "/contracts", label: "My Contracts", Icon: DocumentTextIcon },
    { to: "/invoices", label: "My Invoices", Icon: ReceiptPercentIcon },
    { to: "/payments", label: "My Payments", Icon: CreditCardIcon },
    { to: "/profile", label: "Profile", Icon: UserCircleIcon },
  ];

  return (
    <WorkspaceSidebar
      userName="Jane Smith"
      subtitle="Individual Client"
      meta="User ID: IC-2187461"
      navItems={navItems}
      summaryLabel="Open Balance"
      summaryValue="$42,850"
      summaryHint="Across invoices and scheduled payments"
    />
  );
}

export default ClientSidebar;
