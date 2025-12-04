const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Create a new sell request
export const createSellRequest = async (data) => {
  try {
    const response = await fetch(`${API_URL}/sell`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to submit sell request");
    }
    return result;
  } catch (error) {
    console.error("Create sell request error:", error);
    throw error;
  }
};

// Get all sell requests (for admin)
export const getAllSellRequests = async (status = null) => {
  try {
    const token = getAuthToken();
    const url = status ? `${API_URL}/sell?status=${status}` : `${API_URL}/sell`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch sell requests");
    }
    return result;
  } catch (error) {
    console.error("Get sell requests error:", error);
    throw error;
  }
};

// Get a single sell request
export const getSellRequest = async (id) => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/sell/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch sell request");
    }
    return result;
  } catch (error) {
    console.error("Get sell request error:", error);
    throw error;
  }
};

// Public: get all approved sell requests for catalog (no auth)
export const getApprovedPublicSellRequests = async () => {
  try {
    const response = await fetch(`${API_URL}/sell/public/approved`);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch approved sell cars");
    }

    return result;
  } catch (error) {
    console.error("Get approved public sell requests error:", error);
    throw error;
  }
};

// Public: get a single approved sell request by id (for car detail)
export const getPublicSellRequest = async (id) => {
  try {
    const response = await fetch(`${API_URL}/sell/public/${id}`);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch approved sell car");
    }

    return result;
  } catch (error) {
    console.error("Get public sell request error:", error);
    throw error;
  }
};

// Approve a sell request
export const approveSellRequest = async (id, adminNotes = "") => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/sell/${id}/approve`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ adminNotes }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to approve sell request");
    }
    return result;
  } catch (error) {
    console.error("Approve sell request error:", error);
    throw error;
  }
};

// Reject a sell request
export const rejectSellRequest = async (id, adminNotes = "") => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/sell/${id}/reject`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ adminNotes }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to reject sell request");
    }
    return result;
  } catch (error) {
    console.error("Reject sell request error:", error);
    throw error;
  }
};
