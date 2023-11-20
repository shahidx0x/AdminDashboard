import axios from "axios";
import { config } from "../configs/api.config";

export async function getTransaction(data) {
  const headers = {
    "Cache-Control": "no-cache",
    Authorization: `Bearer ${data.queryKey[2]}`,
  };

  try {
    const response = await axios.get(
      config.endpoints.host + `/transaction?limit=8&page=${data.queryKey[1]}`,
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching Transaction:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}
