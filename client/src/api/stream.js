import api from "./axios";

export async function getStreamToken() {
  const response = await api.get("/live/token");
  return response.data;
}
