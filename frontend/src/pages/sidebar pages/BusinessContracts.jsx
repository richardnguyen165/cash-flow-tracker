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
        const result = decodedToken;
        let contractData;
        setRole(result.User_Role);

        if (result.User_Role === "BUSINESS") {
          contractData = await fetchBusinessContracts(result.id);
        } else {
          contractData = await fetchBusinessContracts(result.business_id);
        }

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
