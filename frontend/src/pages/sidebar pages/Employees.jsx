import BusinessSideBar from "../../components/sidebar/BusinessSideBar";
import MainLayout from "../../layout/MainLayout";
import { businessAdminNav } from "../../config/workspaceNav";

function Employees() {
  const employees = [
    ["Maya Torres", "Operations Analyst", "Expense review, invoice support", "Active"],
    ["Jordan Pike", "Contract Specialist", "Contract preparation and approvals", "Active"],
    ["Nina Alvarez", "Finance Associate", "Billing operations", "Pending Invite"],
  ];

  return (
    <MainLayout
      sidebar={<BusinessSideBar />}
      navItems={businessAdminNav}
      brandLink="/business/dashboard"
    >
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b5cf6]">
          Team Management
        </p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[#0f172a]">
          Employees
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-[#64748b]">
          Track employees attached to your business, what roles they hold, and what work is currently assigned to them.
        </p>
      </section>

      <section className="mt-8 rounded-[32px] border border-[#e7edf5] bg-white p-8 shadow-[0_16px_45px_rgba(15,23,42,0.04)]">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-[#0f172a]">
            Employee Directory
          </h2>
          <button className="rounded-2xl bg-[#111827] px-5 py-3 text-sm font-semibold text-white transition hover:bg-black">
            Invite Employee
          </button>
        </div>
        <div className="mt-6 overflow-hidden rounded-[28px] border border-[#eef2f6]">
          <table className="min-w-full divide-y divide-[#eef2f6]">
            <thead className="bg-[#f8fafc]">
              <tr className="text-left text-xs uppercase tracking-[0.18em] text-[#94a3b8]">
                {["Employee", "Role", "Assigned Work", "Status"].map((header) => (
                  <th key={header} className="px-6 py-4 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef2f6] bg-white">
              {employees.map((row) => (
                <tr key={row[0]} className="text-sm text-[#0f172a]">
                  {row.map((cell, index) => (
                    <td
                      key={`${row[0]}-${index}`}
                      className={`px-6 py-5 ${index === 0 ? "font-medium" : "text-[#475569]"}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </MainLayout>
  );
}

export default Employees;
