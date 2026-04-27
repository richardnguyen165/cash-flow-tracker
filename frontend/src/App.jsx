import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/main/Landing";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import SiteAdmin from "./pages/auth/SiteAdmin";
import SignInInfo from "./pages/auth/SignInInfo";
import Dashboard from "./pages/main/Dashboard";
import BusinessDashboard from "./pages/main/BusinessDashboard";
import EmployeeDashboard from "./pages/main/EmployeeDashboard";
import SiteAdminDashboard from "./pages/main/SiteAdminDashboard";
import Analytics from "./pages/main/Analytics";
import Profile from "./pages/auth/Profile";
import IndividualProfile from "./pages/auth/IndividualProfile";
import BusinessProfile from "./pages/auth/BusinessProfile";
import EmployeeProfile from "./pages/auth/EmployeeProfile";
import Contracts from "./pages/sidebar pages/Contracts";
import Invoices from "./pages/sidebar pages/Invoices";
import Payments from "./pages/sidebar pages/Payments";
import BusinessSideBar from "./components/sidebar/BusinessSideBar";
import EmployeeSideBar from "./components/sidebar/EmployeeSideBar";
import AdminSideBar from "./components/sidebar/AdminSideBar";
import Employees from "./pages/sidebar pages/Employees";
import Expenses from "./pages/sidebar pages/Expenses";
import ManageUsers from "./pages/sidebar pages/ManageUsers";
import ManageBusinesses from "./pages/sidebar pages/ManageBusinesses";
import EmployeeContracts from "./pages/sidebar pages/EmployeeContracts";
import EmployeePayments from "./pages/sidebar pages/EmployeePayments";
import { Toaster } from 'react-hot-toast';
import { ProtectedRoute } from "./components/ProtectedRoute";

import {
  businessAdminNav,
  employeeNav,
  siteAdminNav,
} from "./config/workspaceNav";
import IndividualContracts from "./pages/sidebar pages/IndividualContracts";
import EmployeeExpenses from "./pages/sidebar pages/EmployeeExpenses";
import IndividualInvoices from "./pages/sidebar pages/IndividualInvoices";
import IndividualPayments from "./pages/sidebar pages/IndividualPayments";
import BusinessPayments from "./pages/sidebar pages/BusinessPayments";
import BusinessContracts from "./pages/sidebar pages/BusinessContracts";
import BusinessInvoices from "./pages/sidebar pages/BusinessInvoices";
import BusinessEmployees from "./pages/sidebar pages/BusinessEmployees";
import BusinessExpenses from "./pages/sidebar pages/BusinessExpenses";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/siteadmin" element={<SiteAdmin />} />
        <Route path="/signininfo" element={<SignInInfo />} />
        
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><IndividualProfile /></ProtectedRoute>} />
        <Route path="/contracts" element={<ProtectedRoute><IndividualContracts /></ProtectedRoute>} />
        <Route path="/invoices" element={<ProtectedRoute><IndividualInvoices /></ProtectedRoute>} />
        <Route path="/payments" element={<ProtectedRoute><IndividualPayments /></ProtectedRoute>} />
        {/* <Route path="/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} /> */}

        <Route path="/business/dashboard" element={<ProtectedRoute><BusinessDashboard /></ProtectedRoute>} />
        <Route
          path="/business/expenses"
          element={
            <ProtectedRoute>
              <BusinessExpenses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/business/contracts"
          element={
            <ProtectedRoute>
              <BusinessContracts
                sidebar={<BusinessSideBar />}
                navItems={businessAdminNav}
                brandLink="/business/dashboard"
                eyebrow="Business Contracts"
                title="Business Contracts"
                description="Review the client and partner agreements your business is responsible for maintaining."
                summaryCards={[
                  ["Active Contracts", "12", "Across current counterparties"],
                  ["Awaiting Approval", "03", "Pending admin review"],
                  ["Projected Contract Value", "$1.8M", "Based on active terms"],
                ]}
                agreements={[
                  ["Capital Management Agreement", "Active", "May 23, 2025"],
                  ["Budgeting Agreement", "Active", "Aug 30, 2025"],
                  ["Forecasting Clause", "Pending", "Aug 30, 2026"],
                ]}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/business/invoices"
          element={
            <ProtectedRoute>
              <BusinessInvoices 
                sidebar={<BusinessSideBar />}
                navItems={businessAdminNav}
                brandLink="/business/dashboard"
                eyebrow="Business Billing"
                title="Business Invoices"
                description="Track invoices issued to counterparties, amounts collected, and approvals still waiting on action."
                summaryCards={[
                  [
                    "Outstanding Receivables",
                    "$412,000.00",
                    "Across open invoices",
                  ],
                  ["Pending Approval", "06", "Items waiting on business review"],
                  [
                    "Collected This Month",
                    "$126,800.00",
                    "Processed settlements",
                  ],
                ]}
                invoices={[
                  ["INV-2401", "Apr 01, 2026", "$84,210.00", "Processing"],
                  ["INV-2398", "Mar 28, 2026", "$185,290.00", "Overdue"],
                  ["INV-2384", "Mar 15, 2026", "$120,000.00", "Paid"],
                ]}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/business/payments"
          element={
            <ProtectedRoute>
              <BusinessPayments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/business/employees"
          element={
            <ProtectedRoute>
              <BusinessEmployees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/business/profile"
          element={
            <ProtectedRoute>
              <BusinessProfile />
            </ProtectedRoute>
          }
        />

        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route
          path="/employee/contracts"
          element={
            <ProtectedRoute>
              <EmployeeContracts />
            </ProtectedRoute>
          }
        />
        <Route path="/employee/expenses" element={<EmployeeExpenses />} />
        <Route
          path="/employee/payments"
          element={
            <ProtectedRoute>
              <EmployeePayments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/profile"
          element={
            <ProtectedRoute>
              <EmployeeProfile />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/dashboard" element={<ProtectedRoute><SiteAdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute><ManageUsers /></ProtectedRoute>} />
        <Route path="/admin/businesses" element={<ProtectedRoute><ManageBusinesses /></ProtectedRoute>} />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute>
              <Profile
                sidebar={<AdminSideBar />}
                navItems={siteAdminNav}
                brandLink="/admin/dashboard"
                eyebrow="Administration"
                title="Admin Profile"
                description="Manage site administration access, moderation alerts, and platform-level preferences."
                infoFields={[
                  ["Name", "Platform Admin"],
                  ["Email Address", "admin@trillium.com"],
                  ["Office", "Platform Operations"],
                  ["Access Level", "Global Admin"],
                ]}
                preferenceRows={[
                  {
                    title: "Moderation alerts",
                    description:
                      "Send notifications for flagged users, businesses, and privilege requests.",
                    enabled: true,
                  },
                  {
                    title: "System status summaries",
                    description:
                      "Receive daily platform health and moderation queue recaps.",
                    enabled: true,
                  },
                ]}
                securityTitle="Platform Access"
                securityDescription="Manage high-privilege credentials and keep site administration secure."
                statusTitle="Admin Status"
                statusItems={[
                  "Global moderation enabled",
                  "Privilege controls active",
                  "Business verification queue synced",
                ]}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
