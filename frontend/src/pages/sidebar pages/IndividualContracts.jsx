import { useEffect, useState } from "react";
import EmployeeSideBar from "../../components/sidebar/EmployeeSideBar";
import Contracts from "./Contracts";
import { clientNav } from "../../config/workspaceNav";
import { fetchIndividualContracts } from "../../services/individualWorkspace";
import ClientSidebar from "../../components/sidebar/ClientSideBar";
import decodeTokens from "../../services/decode-tokens";

function IndividualContracts() {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadIndividualContracts() {
      try {
        const decodedToken = decodeTokens();
        const { id, User_Role  } = decodedToken;

        const contractData = await fetchIndividualContracts(id);

        const normalizedContracts = contractData.map((contract) => ({
          agreementId: `CONTRACT-${contract.id}`,
          name: contract.Contract_Name,
          dueDate: contract.Contract_Completion_Date,
          amount: `$${contract.Contract_Cost}`,
          status: contract.Contract_Status ? "Active" : "Pending",
          description: contract.Contract_Terms,
        }));

        setAgreements(normalizedContracts);
      } catch (error) {
        console.error("Could not load individual contracts.", error);
        setAgreements([]);
      } finally {
        setLoading(false);
      }
    }

    loadIndividualContracts();
  }, []);

  return (
    <Contracts
      sidebar={<ClientSidebar />}
      navItems={clientNav}
      brandLink="/dashboard"
      tableTitle="Individual Contracts"
      agreements={agreements}
      allowCreateContract={false}
      columns={["Contract", "Finish Date", "Amount", "Status"]}
      subtitle={
        loading
          ? "Loading the contracts available in your individual workspace..."
          : "These are the contracts currently visible to your individual workspace."
      }
    />
  );
}

export default IndividualContracts;
