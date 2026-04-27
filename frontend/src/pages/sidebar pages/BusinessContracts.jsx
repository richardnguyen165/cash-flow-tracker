import { useEffect, useState } from "react";
import EmployeeSideBar from "../../components/sidebar/EmployeeSideBar";
import Contracts from "./Contracts";
import { businessAdminNav } from "../../config/workspaceNav";
import { fetchBusinessContracts } from "../../services/businessWorkspace";
import ClientSidebar from "../../components/sidebar/ClientSideBar";
import decodeTokens from "../../services/decode-tokens";
import BusinessSideBar from "../../components/sidebar/BusinessSideBar";

function BusinessContracts() {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    async function loadBusinessContracts() {
      try {
        const decodedToken = decodeTokens();
        const { id, User_Role  } = decodedToken;

        setRole(User_Role);

        const contractData = await fetchBusinessContracts(id);

        setAgreements(contractData.data);
      } catch (error) {
        console.error("Could not load individual contracts.", error);
        setAgreements([]);
      } finally {
        setLoading(false);
      }
    }

    loadBusinessContracts();
  }, []);

  return (
    <Contracts
      sidebar={<BusinessSideBar />}
      navItems={businessAdminNav}
      brandLink="/business/dashboard"
      tableTitle="Business Contracts"
      agreements={agreements}
      allowCreateContract={role !== "BUSINESS"}
      columns={["Contract", "Finish Date", "Amount", "Status"]}
      subtitle={
        loading
          ? "Loading the contracts available in your business workspace..."
          : "These are the contracts currently visible to your business workspace."
      }
    />
  );
}

export default BusinessContracts;
