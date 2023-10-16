import axios from "axios";
import { config } from "../configs/api.config";

export async function getBrands(data) {
  const headers = {
    Authorization: `Bearer ${data.queryKey[2]}`,
  };

  try {
    const response = await axios.get(
      config.endpoints.brands + `?limit=8&page=${data.queryKey[1]}`,
      { headers }
    );
    return response;
  } catch (error) {
    console.error(
      "Error fetching users:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

export async function getBrandsByName(data) {
  const headers = {
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

export async function createBrand({ data, token }) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(config.endpoints.brand_create, data, {
      headers,
    });

    return response;
  } catch (error) {
    if (error.response) {
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Error:", error.message);
    }

    throw error;
  }
}
