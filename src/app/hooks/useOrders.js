"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchCartsList } from "../api/carts";

const STATUSES = ["Delivered", "Pending", "Cancelled"];

function deterministicStatus(id) {
  return STATUSES[id % STATUSES.length];
}

function deterministicDate(id) {
  const base = new Date("2026-06-01").getTime();
  const offset = (id * 37) % 40;
  return new Date(base - offset * 86_400_000);
}

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const data = await fetchCartsList(15);
      return data.carts.map((cart) => ({
        id: cart.id,
        orderNumber: `VLA-${10000 + cart.id}`,
        date: deterministicDate(cart.id),
        status: deterministicStatus(cart.id),
        items: cart.products,
        itemCount: cart.totalQuantity,
        total: cart.total,
        discountedTotal: cart.discountedTotal,
      }));
    },
    staleTime: 60_000,
  });
}
