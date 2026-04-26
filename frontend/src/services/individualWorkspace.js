import api from "./api";

export async function fetchIndividualContracts(individualId) {
  const response = await api.get(`api/indiv/contracts/get/${individualId}`);
  return response.data;
}

export async function fetchIndividualInvoices(userId){
  const response = await api.get(`api/indiv/invoices/get/${userId}`);
  return response.data;
}
