import axios from "axios";
import { config } from "../configs/api.config";

export async function getProducts(data) {
  const headers = {
    "Cache-Control": "no-cache",
    Authorization: `Bearer ${data.queryKey[2]}`,
  };
  let urls;
  if (data.queryKey[3]) {
    urls =
      config.endpoints.get_all_product + `/?product_id=${data.queryKey[3]}`;
  } else {
    urls =
      config.endpoints.get_all_product + `?limit=10&page=${data.queryKey[1]}`;
  }

  try {
    const response = await axios.get(urls, { headers });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching products:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}
export async function searchProduct(data) {
  const headers = {
    "Cache-Control": "no-cache",
    Authorization: `Bearer ${data.queryKey[2]}`,
  };

  try {
    const response = await axios.get(
      config.endpoints.get_all_product + `?limit=8&search=${data.queryKey[1]}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching search data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

export async function createProduct({ data, token }) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(config.endpoints.create_products, data, {
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

export async function updateProduct({ data, token, id }) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await axios.patch(
      config.endpoints.host + `/update/products/${id}`,
      data,
      {
        headers,
      }
    );

    if (response.status !== 200) {
      throw new Error("Error updating product");
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
export async function updateProductStatus({ data, token, id }) {
  console.log(data);
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await axios.patch(
      config.endpoints.host + `/update/products/${id}`,
      data,
      {
        headers,
      }
    );

    if (response.status !== 200) {
      throw new Error("Error updating product");
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
export async function deleteProduct({ id, token }) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.delete(
      config.endpoints.host + `/delete/products/${id}`,
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
export async function updateSku({ data, token, id }) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await axios.patch(
      config.endpoints.host + `/update/sku/in/product/${id}`,
      data,
      {
        headers,
      }
    );

    if (response.status !== 200) {
      throw new Error("Error updating sku");
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
