const API_URL = "https://dummyjson.com";

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products?limit=100`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/users?limit=100`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};

export const getCarts = async () => {
  const response = await fetch(`${API_URL}/carts?limit=100`);

  if (!response.ok) {
    throw new Error("Failed to fetch carts");
  }

  return response.json();
};