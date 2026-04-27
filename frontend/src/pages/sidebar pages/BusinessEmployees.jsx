import { useEffect, useState } from "react";
import BusinessSideBar from "../../components/sidebar/BusinessSideBar";
import MainLayout from "../../layout/MainLayout";
import { businessAdminNav } from "../../config/workspaceNav";
import decodeTokens from "../../services/decode-tokens";
import {
  fetchBusinessEmployees,
  inviteBusinessEmployee,
} from "../../services/businessWorkspace";

function BusinessEmployees() {
  const [employees, setEmployees] = useState([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [inviting, setInviting] = useState(false);

  const decoded = decodeTokens();
  const businessId =
    decoded?.User_Role === "BUSINESS"
      ? decoded.id ?? null
      : decoded?.business_id ?? decoded?.id ?? null;

  useEffect(() => {
    async function loadEmployees() {
      if (!businessId) {
        setEmployees([]);
        setLoading(false);
        return;
      }
      try {
        const rows = await fetchBusinessEmployees(businessId);
        setEmployees(Array.isArray(rows) ? rows : []);
      } catch (error) {
        console.error("Could not load employees.", error);
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    }

    loadEmployees();
  }, [businessId]);

  async function handleInvite(e) {
    e.preventDefault();
    const email = inviteEmail.trim().toLowerCase();
    if (!email || !businessId) return;

    try {
      setInviting(true);
      const invited = await inviteBusinessEmployee(businessId, email);
      setEmployees((prev) => {
        const withoutExisting = prev.filter((row) => row.id !== invited.id);
        return [invited, ...withoutExisting];
      });
      setInviteEmail("");
    } catch (error) {
      console.error("Could not invite employee.", error);
    } finally {
      setInviting(false);
    }
  }



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
          Business Employees
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-[#64748b]">
          Invite an employee by individual email and view each employee record details.
        </p>
      </section>

      {(decoded?.User_Role === "BUSINESS" ? <></> :
      <section className="mt-8 rounded-[32px] border border-[#e7edf5] bg-white p-8 shadow-[0_16px_45px_rgba(15,23,42,0.04)]">
        <form className="flex flex-col gap-3 sm:flex-row sm:items-end" onSubmit={handleInvite}>
          <div className="w-full sm:max-w-md">
            <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">
              Individual Email
            </label>
            <input
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="name@example.com"
              type="email"
              required
              className="mt-2 w-full rounded-xl border border-[#e5eaf0] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-50"
            />
          </div>
          <button
            type="submit"
            disabled={inviting || !businessId}
            className="rounded-2xl bg-[#111827] px-5 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {inviting ? "Inviting..." : "Invite Employee"}
          </button>
        </form>
      </section>)}

      <section className="mt-8 grid gap-4">
        {loading ? (
          <p className="text-sm text-[#64748b]">Loading employee records...</p>
        ) : employees.length === 0 ? (
          <p className="text-sm text-[#64748b]">No employees found for this business.</p>
        ) : (
          employees.map((employee) => (
            <div
              key={employee.id}
              className="rounded-2xl border border-[#e7edf5] bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.03)]"
            >
              <p className="text-base font-semibold text-[#0f172a]">
                {employee.email || "No email"}
              </p>
              <div className="mt-2 grid grid-cols-1 gap-2 text-sm text-[#475569] sm:grid-cols-2">
                <p>User ID: {employee.user_id ?? "N/A"}</p>
                <p>Business ID: {employee.business_id ?? "N/A"}</p>
                <p>Business: {employee.business_name || "N/A"}</p>
                <p>Role: {employee.role || "N/A"}</p>
                <p>User Role: {employee.user_role || "N/A"}</p>
                <p>Pay: ${employee.pay ?? "0.00"}</p>
                <p>Expense Plan ID: {employee.expense_plan_id ?? "N/A"}</p>
                <p>Expense ID: {employee.expense_id ?? "N/A"}</p>
              </div>
            </div>
          ))
        )}
      </section>
    </MainLayout>
  );
}

export default BusinessEmployees;
