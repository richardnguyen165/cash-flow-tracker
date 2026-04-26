import api from "./api";

export async function fetchIndividualContracts(individualId) {
  const response = await api.get(`api/indiv/contracts/get/${individualId}`);
  return response.data;
}


