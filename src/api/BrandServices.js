import axios from "axios";
import { config } from "../configs/api.config";

export async function getBrands(data) {
  const headers = {
    "Cache-Control": "no-cache",
    Authorization: `Bearer ${data.queryKey[2]}`,
  };

  try {
    const response = await axios.get(
      config.endpoints.brands + `?limit=8&page=${data.queryKey[1]}`,
      { headers }
    );
    console.log(response.data);
    return response;
  } catch (error) {
    console.error(
      "Error fetching users:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}
export async function getBrandsSearched(data) {
  const headers = {
    "Cache-Control": "no-cache",
    Authorization: `Bearer ${data.queryKey[2]}`,
  };

  try {
    const response = await axios.get(
      config.endpoints.brand_search + `?brandName=${data.queryKey[1]}`,
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

export async function getBrandsIdAndName(data) {
  const headers = {
    "Cache-Control": "no-cache",
    Authorization: `Bearer ${data.queryKey[1]}`,
  };

  try {
    const response = await axios.get(
      config.endpoints.get_all_brand_id_and_name,

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

export async function getBrandsByName(data) {
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

export async function deleteBrand(data) {
  try {
    const headers = {
      Authorization: `Bearer ${data?.token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.delete(
      config.endpoints.host + `/delete/brands/by/${data?.deleteId}`,
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

export async function updateBrand({ data, token, id }) {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const response = await axios.patch(
    config.endpoints.host + `/update/brands/by/${id}`,
    data,
    {
      headers,
    }
  );

  if (response.status !== 200) {
    throw new Error("Error updating user");
  }
  return response.data;
}
