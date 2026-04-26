import { useEffect, useState } from "react";
import EmployeeSideBar from "../../components/sidebar/EmployeeSideBar";
import Profile from "./Profile";
import { employeeNav } from "../../config/workspaceNav";
import { fetchEmployeeProfile } from "../../services/employeeWorkspace";

function EmployeeProfile() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    async function loadEmployeeProfile() {
      try {
        const data = await fetchEmployeeProfile();
        setProfileData(data);
      } catch (error) {
        console.error("Could not load employee profile.", error);
      }
    }

    loadEmployeeProfile();
  }, []);

  const employee = profileData?.employee;
  const business = profileData?.business;
  const user = profileData?.user;

  return (
    <Profile
      sidebar={<EmployeeSideBar />}
      navItems={employeeNav}
      brandLink="/employee/dashboard"
      eyebrow="Employee Profile"
      title="Employee Settings"
      description="Review the account, business, and role information linked to your employee workspace."
      infoFields={[
        ["Username", user?.username ?? "Loading..."],
        ["Employee Role", employee?.Role ?? "Loading..."],
        ["Business", business?.Business_Name ?? "Loading..."],
        ["Business Phone", business?.Business_PhoneNumber ?? "Loading..."],
      ]}
      preferenceRows={[
        {
          title: "Task alerts",
          description: "Notify me when business work or expense tasks change.",
          enabled: true,
        },
        {
          title: "Payment updates",
          description: "Show new wage and reimbursement history when it is recorded.",
          enabled: true,
        },
      ]}
      securityTitle="Employee Access"
      securityDescription="This is the sign-in and role information currently tied to your employee account."
      statusTitle="Employee Status"
      statusItems={[
        business?.Business_Profile ? `Business profile: ${business.Business_Profile}` : "Business profile available",
        employee?.Pay ? `Current pay record: $${employee.Pay}` : "Current pay record not available",
        user?.User_Role ? `Account role: ${user.User_Role}` : "Account role loading",
      ]}
    />
  );
}

export default EmployeeProfile;
