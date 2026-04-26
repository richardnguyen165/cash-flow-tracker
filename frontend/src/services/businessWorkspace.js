import api from "./api";

export async function fetchBusinessContracts(businessId) {
  const response = await api.get(`api/business/contracts/get/${businessId}`);
  return response.data;
}