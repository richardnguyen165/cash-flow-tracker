import AdminSideBar from "../../components/sidebar/AdminSideBar";
import MainLayout from "../../layout/MainLayout";
import MetricCard from "../../components/cards/MetricCard";
import { siteAdminNav } from "../../config/workspaceNav";

function SiteAdminDashboard() {
  const reviewItems = [
    ["Northshore Capital", "Business approval update", "Needs review"],
    ["Avery Chen", "Privilege escalation request", "Pending"],
    ["Silverline Consulting", "Profile moderation flag", "Open"],
  ];

  return (
    <MainLayout
      sidebar={<AdminSideBar />}
      navItems={siteAdminNav}
      brandLink="/admin/dashboard"
    >
      <section>
        <h1 className="text-5xl font-semibold tracking-tight text-black">Platform Dashboard</h1>
        <p className="mt-3 max-w-3xl text-lg text-[#4b5563]">
          Oversee businesses, users, and platform integrity from the global administration workspace.
        </p>
      </section>

      <section className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-[28px] border border-[#efeafc] bg-[#f6efff] p-8 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6b7280]">
            Open Moderation Queue
          </p>
          <h2 className="mt-5 text-6xl font-semibold tracking-tight text-black">
            18
          </h2>
          <p className="mt-4 text-sm text-[#4b5563]">
            Businesses, users, and approval requests waiting for platform review.
          </p>
        </div>

        <div className="rounded-[28px] border border-[#ececf2] bg-white p-8 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6b7280]">
            Active Businesses
          </p>
          <h3 className="mt-4 text-4xl font-semibold tracking-tight text-[#8b5cf6]">
            124
          </h3>
          <p className="mt-3 text-sm text-[#4b5563]">
            Registered organizations currently using the platform.
          </p>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <MetricCard label="User Flags" value="07" subtitle="Profiles needing moderation" compact />
        <MetricCard label="Admin Requests" value="05" subtitle="Privilege changes awaiting approval" compact />
        <MetricCard label="Platform Uptime" value="99.98%" subtitle="Reported system availability" compact accent="text-[#8b5cf6]" />
      </section>

      <section className="mt-8 rounded-[32px] border border-[#e7edf5] bg-white p-8 shadow-[0_16px_45px_rgba(15,23,42,0.04)]">
        <h2 className="text-2xl font-semibold tracking-tight text-[#0f172a]">
          Priority Review Items
        </h2>
        <div className="mt-6 overflow-hidden rounded-[28px] border border-[#eef2f6]">
          <table className="min-w-full divide-y divide-[#eef2f6]">
            <thead className="bg-[#f8fafc]">
              <tr className="text-left text-xs uppercase tracking-[0.18em] text-[#94a3b8]">
                {["Entity", "Issue", "Status"].map((header) => (
                  <th key={header} className="px-6 py-4 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef2f6] bg-white">
              {reviewItems.map((row) => (
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

export default SiteAdminDashboard;
