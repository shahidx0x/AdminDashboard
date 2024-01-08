import axios from "axios";
import { config } from "../configs/api.config";

export async function getSettings(data) {
  const headers = {
    "Cache-Control": "no-cache",
    Authorization: `Bearer ${data.queryKey[2]}`,
  };

  try {
    const response = await axios.get(config.endpoints.host + `/app/settings`, {
      headers,
    });

    return response;
  } catch (error) {
    console.error(
      "Error fetching settings:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}