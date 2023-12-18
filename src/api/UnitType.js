import axios from "axios";
import { config } from "../configs/api.config";

export async function getUnit(data) {
  const headers = {
    "Cache-Control": "no-cache",
    Authorization: `Bearer ${data.queryKey[2]}`,
  };

  try {
    const response = await axios.get(config.endpoints.host + `/unit-types`, {
      headers,
    });

    return response;
  } catch (error) {
    console.error(
      "Error fetching unit:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

export async function getUnitInfo(data) {
  const headers = {
    "Cache-Control": "no-cache",
    Authorization: `Bearer ${data.queryKey[2]}`,
  };

  try {
    const response = await axios.get(config.endpoints.host + `/units`, {
      headers,
    });

    return response;
  } catch (error) {
    console.error(
      "Error fetching unit info:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

export async function createUnit({ data, token }) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(
      config.endpoints.host + "/unit-types",
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

export async function createUnitInfo({ data, token }) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(config.endpoints.host + "/units", data, {
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

export async function deleteUnit(data) {
 
  try {
    const headers = {
      Authorization: `Bearer ${data?.token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.delete(
      config.endpoints.host + `/unit-types/${data?.id}`,
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

export async function deleteUnitInfo(data) {

  try {
    const headers = {
      Authorization: `Bearer ${data?.token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.delete(
      config.endpoints.host + `/units/${data?.deleteId}`,
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

export async function updateUnit({ data, token, id }) {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const response = await axios.patch(
    config.endpoints.host + `/unit-types/${id}`,
    data,
    {
      headers,
    }
  );

  if (response.status !== 200) {
    throw new Error("Error updating unit");
  }
  return response.data;
}
