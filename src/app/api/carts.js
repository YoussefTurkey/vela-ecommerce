import api from "./axios";

// dummyjson carts are simulated (won't persist server-side) but we call
// the real endpoints so network calls are genuine, then mirror state locally.

export async function fetchCartsList(limit = 12) {
  const { data } = await api.get("/carts", { params: { limit } });
  return data;
}

export async function addCartApi(userId, products) {
  const { data } = await api.post("/carts/add", {
    userId,
    products, // [{ id, quantity }]
  });
  return data;
}

export async function fetchUserCarts(userId) {
  const { data } = await api.get(`/carts/user/${userId}`);
  return data;
}

export async function updateCartApi(cartId, products) {
  const { data } = await api.put(`/carts/${cartId}`, {
    merge: true,
    products,
  });
  return data;
}
