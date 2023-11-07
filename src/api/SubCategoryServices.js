import axios from "axios";
import { config } from "../configs/api.config";

export async function getSubCategoryByCategoryId(data) {
  const headers = {
    "Cache-Control": "no-cache",
    Authorization: `Bearer ${data.queryKey[2]}`,
  };
  try {
    const response = await axios.get(
      config.endpoints.host +
        `/get/all/subcat/${data.queryKey[3]}?limit=${
          data.queryKey[4] || 8
        }&page=${data.queryKey[1]}`,
      { headers }
    );
    if (response.status === 404) {
      throw new Error("sub category not found");
    }
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("sub category not found");
    }
    throw error;
  }
}

export async function getAllSubCategory(data) {
  let url;
  const headers = {
    "Cache-Control": "no-cache",
    Authorization: `Bearer ${data.queryKey[2]}`,
  };
  if (data.queryKey[4]) {
    url =
      config.endpoints.host +
      `/get/all/subcat/${data.queryKey[3]}?limit=8&page=${data.queryKey[1]}&search=${data.queryKey[4]}`;
  } else {
    url =
      config.endpoints.host +
      `/get/all/subcat/${data.queryKey[3]}?limit=8&page=${data.queryKey[1]}`;
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

export async function UpdateSubCategory({ data, token, cat_id, sub_cat_id }) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await axios.patch(
      config.endpoints.host + `/subcategory/${cat_id}/${sub_cat_id}`,
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
