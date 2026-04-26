import {
  DocumentTextIcon,
  ReceiptPercentIcon,
  ClipboardDocumentListIcon,
  CreditCardIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import WorkspaceSidebar from "./WorkspaceSidebar";
import decodeTokens from "../../services/decode-tokens";
import { useEffect, useState } from "react";
import api from "../../services/api";

function ClientSidebar() {
  const [id, setID] = useState(null);
  const [role, setRole] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    async function getData() {
      const decodedToken = decodeTokens();
      const { user_id, User_Role } = decodedToken;
      let link;

      if (User_Role === "INDIVIDUAL") {
        link = `api/indiv/get/user/${user_id}`
      }

      const send = await api.get(link);
      const all_data = send.data;

      if (User_Role === "INDIVIDUAL"){
        setID(user_id);
        setRole(User_Role);
        setName(all_data.Individual_Name);
      }
      // else if (side_role === "BUSINESS") {

      // }
    }
    getData();
  }, []);



  const navItems = [
    { to: "/contracts", label: "My Contracts", Icon: DocumentTextIcon },
    { to: "/invoices", label: "My Invoices", Icon: ReceiptPercentIcon },
    { to: "/expenses", label: "My Expenses", Icon: ClipboardDocumentListIcon },
    { to: "/payments", label: "My Payments", Icon: CreditCardIcon },
    { to: "/profile", label: "Profile", Icon: UserCircleIcon },
  ];

  return (
    <WorkspaceSidebar
      userName={name}
      subtitle={role === "INDIVIDUAL" ? "Individual Client" : "Business Client"}
      meta={role === "INDIVIDUAL" ? `Individual ID: ${id}` : `Business ID: ${id}`}
      navItems={navItems}
    // summaryLabel="Open Balance"
    // summaryValue="$42,850"
    // summaryHint="Across invoices and scheduled payments"
    />
  );
}

export default ClientSidebar;
