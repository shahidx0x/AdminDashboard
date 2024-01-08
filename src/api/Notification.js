import axios from "axios";
import { config } from "../configs/api.config";

export async function getNotification(data) {
  const headers = {
    "Cache-Control": "no-cache",
    Authorization: `Bearer ${data.queryKey[2]}`,
  };

  try {
    const response = await axios.get(
      config.endpoints.host + `/notifications?limit=-1&notification=general`,
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching users:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}
export async function getUnreadNotification(data) {
  const headers = {
    "Cache-Control": "no-cache",
    Authorization: `Bearer ${data.queryKey[2]}`,
  };

  try {
    const response = await axios.get(
      config.endpoints.host + `/notifications?limit=-1&notification=general&unread=true`,
      {
        headers,
      }
    );

    return response.data.meta;
  } catch (error) {
    console.error(
      "Error fetching users:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}