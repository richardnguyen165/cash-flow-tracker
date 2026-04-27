import { useEffect, useState } from "react";
import EmployeeSideBar from "../../components/sidebar/EmployeeSideBar";
import Contracts from "./Contracts";
import { businessAdminNav } from "../../config/workspaceNav";
import { fetchBusinessInvoices } from "../../services/businessWorkspace";
import ClientSidebar from "../../components/sidebar/ClientSideBar";
import decodeTokens from "../../services/decode-tokens";
import Invoices from "./Invoices";
import BusinessSideBar from "../../components/sidebar/BusinessSideBar";

function BusinessInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    async function loadBusinessInvoices() {
      try {
        const decodedToken = decodeTokens();
        const result = decodedToken;
        setRole(result.User_Role);
        let invoiceData;
        if (result.User_Role === "BUSINESS") {
          invoiceData = await fetchBusinessInvoices(result.id);
        } else {
          invoiceData = await fetchBusinessInvoices(result.business_id);
        }

        setInvoices(invoiceData);
      } catch (error) {
        console.error("Could not load business invoices.", error);
        setInvoices([]);
      } finally {
        setLoading(false);
      }
    }

    loadBusinessInvoices();
  }, []);

  return (
    <Invoices
      sidebar={<BusinessSideBar />}
      navItems={businessAdminNav}
      brandLink="/business/dashboard"
      title="Business Invoices"
      invoices ={invoices}
      tableTitle = "Invoice History"
      allowCreateInvoice={role !== "BUSINESS"}
    />
  );
}

/*
Format of invoices:
  sidebar = <ClientSidebar />,
  navItems = clientNav,
  brandLink = "/dashboard",
  eyebrow = "Billing",
  title = "Invoices",
  description = "Review invoice history, pending approval items, and the balances that still need to be settled.",
  summaryCards = [
    // ["Total Outstanding", "$24,450.00", "Across all open invoices"],
    // ["Pending Review", "02", "Waiting on approval"],
    // ["Last Paid", "$12,000.00", "Settled Sep 15, 2023"],
  ],
  invoices = defaultInvoices,
  tableTitle = "Invoice History",
*/

export default BusinessInvoices;
