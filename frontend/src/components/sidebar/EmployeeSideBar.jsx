import {
  DocumentTextIcon,
  BanknotesIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import WorkspaceSidebar from "./WorkspaceSidebar";
import { fetchEmployeeProfile } from "../../services/employeeWorkspace";

function EmployeeSideBar() {
  const navItems = [
    { to: "/employee/contracts", label: "Assigned Contracts", Icon: DocumentTextIcon },
    { to: "/employee/expenses", label: "Expense Tasks", Icon: ClipboardDocumentListIcon },
    { to: "/employee/payments", label: "Payment History", Icon: BanknotesIcon },
    { to: "/employee/profile", label: "Profile", Icon: UserCircleIcon },
  ];

  const [userName, setUserName] = useState("Employee Account");
  const [meta, setMeta] = useState("Business workspace");

  useEffect(() => {
    async function loadEmployeeSidebar() {
      try {
        const profile = await fetchEmployeeProfile();
        setUserName(profile.user.username);
        setMeta(`${profile.business.Business_Name} - ${profile.employee.Role}`);
      } catch (error) {
        console.error("Could not load employee sidebar profile.", error);
      }
    }

    loadEmployeeSidebar();
  }, []);

  return (
    <WorkspaceSidebar
      userName={userName}
      subtitle="Employee Workspace"
      meta={meta}
      navItems={navItems}
      summaryLabel="Pending Tasks"
      summaryValue="05"
      summaryHint="Line items to log, expenses to review, and assigned contract work"
    />
  );
}

export default EmployeeSideBar;
