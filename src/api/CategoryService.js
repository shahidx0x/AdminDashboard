import axios from "axios";
import { config } from "../configs/api.config";

export async function getCategoryByBrandId(data) {
  const headers = {
    Authorization: `Bearer ${data.queryKey[2]}`,
  };
  try {
    const response = await axios.get(
      config.endpoints.all_category_under_brand +
        `?limit=8&page=${data.queryKey[1]}&brand_id=${data.queryKey[3]}`,
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

export async function createCategory({ data, token }) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(
      config.endpoints.create_category_under_brand,
      data,
      {
        headers,
      }
    );

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
