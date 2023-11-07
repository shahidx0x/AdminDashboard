import axios from "axios";
import { config } from "../configs/api.config";

export async function getUsers(data) {
  const headers = {
    "Cache-Control": "no-cache",
    Authorization: `Bearer ${data.queryKey[2]}`,
  };

  try {
    const response = await axios.get(
      config.endpoints.users + `?limit=${10}&page=${data.queryKey[1]}`,
      { headers }
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

export async function getUsersByEmail(data) {
  const headers = {
    "Cache-Control": "no-cache",
    Authorization: `Bearer ${data.queryKey[2]}`,
  };
  try {
    const response = await axios.get(
      config.endpoints.search_user + `?email=${data.queryKey[1]}`,
      { headers }
    );
    if (response.status === 404) {
      throw new Error("User not found");
    }
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("User not found");
    }
    throw error;
  }
}

export async function updateUser({ data, token }) {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const response = await axios.patch(config.endpoints.update_user, data, {
    headers,
  });

  if (response.status !== 200) {
    throw new Error("Error updating user");
  }
  return response.data;
}

export async function checkSession(data) {
  const headers = {
    Authorization: `Bearer ${data.queryKey[1]}`,
  };

  try {
    const response = await axios.get(config.endpoints.session_check, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    throw error;
  }
}
