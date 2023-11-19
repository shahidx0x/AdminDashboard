import axios from "axios";
import { config } from "../configs/api.config";

export async function getOrders(data) {
  let url;

  switch (data.queryKey[1]) {
    case "pending":
      url = config.endpoints.host + `/orders?limit=-1&order_status=0`;
      break;
    case "approved":
      url = config.endpoints.host + `/orders?limit=-1&order_status=1`;
      break;
    case "cancled":
      url = config.endpoints.host + `/orders?limit=-1&order_status=2`;
      break;
    case "deliverd":
      url = config.endpoints.host + `/orders?limit=-1&order_status=3`;
      break;
    case "search":
      url =
        config.endpoints.host + `/orders?limit=-1&search=${data.queryKey[3]}`;
      break;
    default:
      url = config.endpoints.host + `/orders?limit=-1`;
      break;
  }
  const headers = {
    "Cache-Control": "no-cache",
    Authorization: `Bearer ${data.queryKey[2]}`,
  };

  try {
    const response = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching users:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}
export async function updateOrder({ data, token, id }) {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const response = await axios.patch(
    config.endpoints.host + `/orders/${id}`,
    data,
    {
      headers,
    }
  );

  if (response.status !== 200) {
    throw new Error("Error updating order");
  }
  return response.data;
}
