import {
  DocumentTextIcon,
  ReceiptPercentIcon,
  CreditCardIcon,
  UsersIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import WorkspaceSidebar from "./WorkspaceSidebar";
import { useEffect, useState } from "react";
import api from "../../services/api";
import decodeTokens from "../../services/decode-tokens";

function BusinessSideBar() {
  const navItems = [
    { to: "/business/contracts", label: "Contracts", Icon: DocumentTextIcon },
    { to: "/business/invoices", label: "Invoices", Icon: ReceiptPercentIcon },
    { to: "/business/payments", label: "Payments", Icon: CreditCardIcon },
    { to: "/business/employees", label: "Employees", Icon: UsersIcon },
    { to: "/business/profile", label: "Profile", Icon: UserCircleIcon },
  ];

  const [id, setID] = useState(null);
  const [role, setRole] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    async function getData() {
      const decodedToken = decodeTokens();
      const { user_id, User_Role } = decodedToken;
      let link;

      if (User_Role === "BUSINESS" || User_Role === "BUSINESS_ADMIN") {
        link = `api/business/get/${user_id}`
      }

      const send = await api.get(link);
      const all_data = send.data;

      if (User_Role === "BUSINESS" || User_Role === "BUSINESS_ADMIN"){
        setID(user_id);
        setRole(User_Role);
        setName(all_data.Business_Name);
      }
    }
    getData();
  }, []);

  return (
    <WorkspaceSidebar
      userName={name}
      subtitle="Business Workspace"
      meta={role === "BUSINESS_ADMIN" ? "Signed in as a business admin" : "Signed in as a business"}
      navItems={navItems}
      summaryLabel="Company Balance"
      summaryValue="$2,400,000"
      summaryHint="Active contracts, billed work, and approved expenses"
    />
  );
}

export default BusinessSideBar;
