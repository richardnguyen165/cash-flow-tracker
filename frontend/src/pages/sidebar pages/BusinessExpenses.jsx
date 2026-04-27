import { useEffect, useState } from "react";
import BusinessSideBar from "../../components/sidebar/BusinessSideBar";
import { businessAdminNav } from "../../config/workspaceNav";
import decodeTokens from "../../services/decode-tokens";
import Expenses from "./Expenses";
import {
  createBusinessExpense,
  createBusinessExpensePlan,
  fetchBusinessExpensePlans,
} from "../../services/businessWorkspace";

function normalizeExpense(expense, planTitle) {
  return {
    id: expense.id,
    Expense_Title: expense.Expense_Title || expense.title || "Expense",
    Expense_Type: expense.Expense_Type || expense.type || "General",
    Description: expense.Description || expense.description || "",
    Cost: formatCurrency(expense.Cost ?? expense.cost ?? 0),
    Plan_Title: planTitle,
    Expense_Date_Issued: expense.Expense_Date_Issued || expense.dateIssued || "",
    Expense_Due_By: expense.Expense_Due_By || expense.dueBy || "",
    status: expense.status || "Available for pay-off",
  };
}

function normalizePlan(plan) {
  const title = plan.Plan_Title || plan.title || "Expense Plan";
  return {
    id: plan.id,
    Plan_Title: title,
    Expense_Plan_Due: plan.Expense_Plan_Due || plan.dueDate || "",
    Occurance_Number: plan.Occurance_Number ?? 1,
    expenses: (plan.expenses || []).map((expense) => normalizeExpense(expense, title)),
  };
}

function formatCurrency(value) {
  const n = Number(String(value ?? "").replace(/[^0-9.-]/g, ""));
  const safe = Number.isFinite(n) ? n : 0;
  return safe.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function numberFromCurrency(value) {
  const n = Number(String(value ?? "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function BusinessExpenses() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const businessId = decodeTokens()?.business_id ?? null;

  useEffect(() => {
    async function loadPlans() {
      try {
        if (!businessId) {
          setPlans([]);
          return;
        }
        const rows = await fetchBusinessExpensePlans(businessId);
        setPlans((Array.isArray(rows) ? rows : []).map(normalizePlan));
      } catch (error) {
        console.error("Could not load business expense plans.", error);
        setPlans([]);
      } finally {
        setLoading(false);
      }
    }

    loadPlans();
  }, [businessId]);

  async function handleCreatePlan(newPlan) {
    if (!businessId) return newPlan;
    const created = await createBusinessExpensePlan(businessId, {
      Plan_Title: newPlan.Plan_Title,
      Expense_Plan_Due: newPlan.Expense_Plan_Due,
      Occurance_Number: newPlan.Occurance_Number,
    });
    const normalized = normalizePlan(created);
    setPlans((prev) => [normalized, ...prev]);
    return normalized;
  }

  async function handleCreateExpense(selectedPlan, newExpense) {
    if (!businessId) return newExpense;
    const created = await createBusinessExpense(businessId, selectedPlan.id, {
      Expense_Title: newExpense.Expense_Title,
      Expense_Type: newExpense.Expense_Type,
      Description: newExpense.Description,
      Cost: numberFromCurrency(newExpense.Cost),
      Expense_Due_By: newExpense.Expense_Due_By,
    });
    const normalizedExpense = normalizeExpense(created, selectedPlan.Plan_Title);
    setPlans((prev) =>
      prev.map((plan) =>
        String(plan.id) === String(selectedPlan.id)
          ? { ...plan, expenses: [normalizedExpense, ...(plan.expenses || [])] }
          : plan
      )
    );
    return normalizedExpense;
  }

  return (
    <Expenses
      sidebar={<BusinessSideBar />}
      navItems={businessAdminNav}
      brandLink="/business/dashboard"
      eyebrow="Business Expenses"
      title="Business Expense Plans"
      description={
        loading
          ? "Loading expense plans tied to your business..."
          : "Review expense plans tied to your business and add expenses under each plan."
      }
      tableTitle="Business Expense Plans"
      expensePlans={plans}
      allowCreatePlan
      onCreateExpensePlan={handleCreatePlan}
      onCreateExpense={handleCreateExpense}
    />
  );
}

export default BusinessExpenses;
