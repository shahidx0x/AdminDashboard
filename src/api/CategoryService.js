import axios from "axios";
import { config } from "../configs/api.config";

export async function getCategoryByBrandId(data) {
  const headers = {
    "Cache-Control": "no-cache",
    Authorization: `Bearer ${data.queryKey[2]}`,
  };
  try {
    const response = await axios.get(
      config.endpoints.host +
        `/get/all/category?limit=${data.queryKey[4] || 8}&page=${
          data.queryKey[1]
        }&brand_id=${data.queryKey[3]}`,
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

export async function getAllCategory(data) {
  const headers = {
    "Cache-Control": "no-cache",
    Authorization: `Bearer ${data.queryKey[2]}`,
  };
  let url;
  if (data.queryKey[3]) {
    url =
      config.endpoints.all_category +
      `?limit=8&page=${data.queryKey[1]}&search=${data.queryKey[3]}`;
  } else {
    url = config.endpoints.all_category + `?limit=8&page=${data.queryKey[1]}`;
  }

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching category:",
      error.response ? error.response.data : error.message
    );
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

export async function deleteCategory(data) {
  try {
    const headers = {
      Authorization: `Bearer ${data?.token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.delete(
      config.endpoints.host + `/delete/category/by/${data?.deleteId}`,
      {
        headers,
      }
    );
    return response.data;
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

export async function updateCategory({ data, token, id }) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await axios.patch(
      config.endpoints.host + `/update/category/by/${id}`,
      data,
      {
        headers,
      }
    );

    if (response.status !== 200) {
      throw new Error("Error updating category");
    }
    return response.data;
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
