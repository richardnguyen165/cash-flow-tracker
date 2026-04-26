import { useEffect, useState } from "react";
import EmployeeSideBar from "../../components/sidebar/EmployeeSideBar";
import Contracts from "./Contracts";
import { employeeNav } from "../../config/workspaceNav";
import { fetchEmployeeContracts, fetchEmployeeProfile } from "../../services/employeeWorkspace";

function EmployeeContracts() {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEmployeeContracts() {
      try {
        const profile = await fetchEmployeeProfile();
        const contractData = await fetchEmployeeContracts(profile.business.id);

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
        console.error("Could not load employee contracts.", error);
        setAgreements([]);
      } finally {
        setLoading(false);
      }
    }

    loadEmployeeContracts();
  }, []);

  return (
    <Contracts
      sidebar={<EmployeeSideBar />}
      navItems={employeeNav}
      brandLink="/employee/dashboard"
      tableTitle="Business Contracts"
      agreements={agreements}
      allowCreateContract={false}
      columns={["Contract", "Finish Date", "Amount", "Status"]}
      subtitle={
        loading
          ? "Loading the contracts available in your business workspace..."
          : "These are the contracts currently visible to your employee workspace."
      }
    />
  );
}

export default EmployeeContracts;
