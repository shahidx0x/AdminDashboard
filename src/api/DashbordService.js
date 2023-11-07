import axios from "axios";
import { config } from "../configs/api.config";

export async function getServerStatus(data) {
  const headers = {
    "Cache-Control": "no-cache",
    Authorization: `Bearer ${data.queryKey[1]}`,
  };

  try {
    const response = await axios.get(config.endpoints.host + "/server-status", {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching server-status:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}
export async function getUsersDevice(data) {
  const headers = {
    "Cache-Control": "no-cache",
    Authorization: `Bearer ${data.queryKey[1]}`,
  };

  try {
    const response = await axios.get(config.endpoints.host + "/users-device", {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching users-device:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}
