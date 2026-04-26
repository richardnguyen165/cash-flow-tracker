import api from "./api";
import decodeTokens from "./decode-tokens";

function getLoggedInEmployeeUserId() {
  const decodedToken = decodeTokens();
  const userId = decodedToken?.id ?? decodedToken?.user_id;

  if (!userId) {
    throw new Error("Missing logged-in employee token.");
  }

  return userId;
}

export async function fetchEmployeeProfile() {
  const userId = getLoggedInEmployeeUserId();
  const response = await api.get(`api/staff/profile/${userId}/`);

  return response.data;
}

export async function fetchEmployeeContracts(businessId) {
  const response = await api.get(`api/staff/business/${businessId}/contracts/`);
  return response.data;
}

export async function fetchEmployeeExpenses(businessId) {
  const response = await api.get(`api/staff/business/${businessId}/expenses/`);
  return response.data;
}

export async function fetchEmployeeTransactions(businessId) {
  const response = await api.get(`api/staff/business/${businessId}/transactions/`);
  return response.data;
}

export async function fetchEmployeeWorkspace() {
  const profile = await fetchEmployeeProfile();
  const businessId = profile.business.id;

  const [contracts, expenses, transactions] = await Promise.all([
    fetchEmployeeContracts(businessId),
    fetchEmployeeExpenses(businessId),
    fetchEmployeeTransactions(businessId),
  ]);

  return {
    ...profile,
    contracts,
    expenses,
    transactions,
  };
}
