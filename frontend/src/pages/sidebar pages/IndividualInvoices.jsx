import { useEffect, useState } from "react";
import EmployeeSideBar from "../../components/sidebar/EmployeeSideBar";
import Contracts from "./Contracts";
import { clientNav } from "../../config/workspaceNav";
import { fetchIndividualInvoices } from "../../services/individualWorkspace";
import ClientSidebar from "../../components/sidebar/ClientSideBar";
import decodeTokens from "../../services/decode-tokens";
import Invoices from "./Invoices";

function IndividualInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadIndividualInvoices() {
      try {
        const decodedToken = decodeTokens();
        const { id, User_Role  } = decodedToken;

        const invoiceData = await fetchIndividualInvoices(id);

        setInvoices(invoiceData);
      } catch (error) {
        console.error("Could not load individual invoices.", error);
        setInvoices([]);
      } finally {
        setLoading(false);
      }
    }

    loadIndividualInvoices();
  }, []);

  return (
    <Invoices
      sidebar={<ClientSidebar />}
      navItems={clientNav}
      brandLink="/dashboard"
      title="Individual Invoices"
      invoices ={invoices}
      tableTitle ="Invoice History"
      allowCreateInvoice={true}
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

export default IndividualInvoices;