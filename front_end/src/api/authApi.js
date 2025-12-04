const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    // Store token in localStorage
    if (data.data?.token) {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data));
    }

    return data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Store token in localStorage
    if (data.data?.token) {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data));
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Get current user from localStorage
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// Get current user info from server (includes role)
export const getCurrentUserInfo = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }

    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to get user info");
    }

    // Update localStorage with fresh user data including role
    if (result.data) {
      const userData = {
        _id: result.data._id,
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone,
        role: result.data.role,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    }

    return null;
  } catch (error) {
    console.error("Get user info error:", error);
    // If token is invalid, clear localStorage
    logoutUser();
    return null;
  }
};

// Check if current user is admin
export const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.role === "admin";
};
