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

export async function fetchBusinessInvoices(userId){
    const response = await api.get(`api/business/invoices/get/${userId}`);
    return response.data;
}