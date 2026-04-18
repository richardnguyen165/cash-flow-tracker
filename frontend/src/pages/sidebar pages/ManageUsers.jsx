import AdminSideBar from "../../components/sidebar/AdminSideBar";
import MainLayout from "../../layout/MainLayout";
import { siteAdminNav } from "../../config/workspaceNav";

function ManageUsers() {
  const users = [
    ["Avery Chen", "Individual Client", "Verified"],
    ["Northshore Capital Admin", "Business Admin", "Active"],
    ["Maya Torres", "Employee", "Pending review"],
  ];

  return (
    <MainLayout
      sidebar={<AdminSideBar />}
      navItems={siteAdminNav}
      brandLink="/admin/dashboard"
    >
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b5cf6]">
          Moderation
        </p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[#0f172a]">
          Platform Users
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-[#64748b]">
          Review account roles, moderation flags, and privilege state across the platform.
        </p>
      </section>

      <section className="mt-8 rounded-[32px] border border-[#e7edf5] bg-white p-8 shadow-[0_16px_45px_rgba(15,23,42,0.04)]">
        <h2 className="text-2xl font-semibold tracking-tight text-[#0f172a]">
          Active User Accounts
        </h2>
        <div className="mt-6 overflow-hidden rounded-[28px] border border-[#eef2f6]">
          <table className="min-w-full divide-y divide-[#eef2f6]">
            <thead className="bg-[#f8fafc]">
              <tr className="text-left text-xs uppercase tracking-[0.18em] text-[#94a3b8]">
                {["User", "Role", "Status"].map((header) => (
                  <th key={header} className="px-6 py-4 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef2f6] bg-white">
              {users.map((row) => (
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

export default ManageUsers;
