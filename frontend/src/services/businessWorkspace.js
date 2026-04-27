import toast from "react-hot-toast";
import api from "./api";

export async function fetchBusinessProfile(businessId) {
  const response = await api.get(`api/business/get/${businessId}`);
  return response.data;
}

export async function fetchBusinessContracts(businessId) {
  const response = await api.get(`api/business/contracts/get/${businessId}`);
  return response.data;
}

export async function sendBusinessContract(businessContractInfo){
  const response = await api.put(`api/business/put/contracts`, businessContractInfo);
  if (response.status !== 201){
    toast.error()
    return false;
  }
  toast.success("Contract created successfully!");
  return true;
}

export async function fetchBusinessInvoices(businessId){
    const response = await api.get(`api/business/invoices/get/${businessId}`);
    return response.data;
}

export async function fetchBusinessExpensePlans(businessId) {
  const response = await api.get(`api/business/expense-plans/${businessId}/`);
  return response.data;
}

export async function createBusinessExpensePlan(businessId, payload) {
  const response = await api.post(`api/business/expense-plans/${businessId}/`, payload);
  return response.data;
}

export async function createBusinessExpense(businessId, expensePlanId, payload) {
  const response = await api.post(
    `api/business/expense-plans/${businessId}/${expensePlanId}/expenses/`,
    payload
  );
  return response.data;
}

export async function fetchBusinessEmployees(businessId) {
  const response = await api.get(`api/business/admin/${businessId}/employees/`);
  return response.data;
}

export async function inviteBusinessEmployee(businessId, email) {
  const response = await api.post(`api/business/admin/${businessId}/employees/invite/`, {
    email,
  });
  return response.data;
}