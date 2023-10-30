import axios from "axios";
import { config } from "../configs/api.config";

export async function getAllSubCategory(data) {
  console.log(
    config.endpoints.host +
      `/get/all/subcat/${data.queryKey[3]}?limit=8&page=${data.queryKey[1]}`
  );
  const headers = {
    Authorization: `Bearer ${data.queryKey[2]}`,
  };

  try {
    const response = await axios.get(
      config.endpoints.host +
        `/get/all/subcat/${data.queryKey[3]}?limit=8&page=${data.queryKey[1]}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching category:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

export async function CreateSubCategory({ data, token, id }) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(
      config.endpoints.host + `/create/subcategory/${id}`,
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

export async function DeleteSubCategory(data) {
  try {
    const headers = {
      Authorization: `Bearer ${data?.token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.delete(
      config.endpoints.host +
        `/subcategory/${data.category_id}/${data.subcategory_id}`,
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

export async function UpdateSubCategory({ data, token, id }) {
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
