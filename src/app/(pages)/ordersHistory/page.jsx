"use client";
import { useState } from "react";
import { Eye, PackageSearch, ArrowRight } from "lucide-react";
import { useOrders } from "../../hooks/useOrders";
import StatusBadge from "../../components/order/StatusBadge";
import OrderDetailsDrawer from "../../components/order/OrderDetailsDrawer";
import Link from "next/link";

export default function OrdersHistory() {
  const { data: orders, isLoading } = useOrders();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");

  const filtered = (orders || []).filter(
    (o) => filter === "all" || o.status === filter,
  );

  return (
    <div className="container-app py-8">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-secondary-700 mb-2">
        Order History
      </h1>
      <p className="text-secondary-500 text-sm mb-6">
        Track and manage all your past orders.
      </p>

      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        {["all", "Delivered", "Pending", "Cancelled"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
              filter === f
                ? "bg-secondary-700 text-white"
                : "bg-gray-100 text-secondary-600 hover:bg-gray-200"
            }`}
          >
            {f === "all" ? "All Orders" : f}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 skeleton rounded-app" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <PackageSearch size={56} className="text-gray-200" />
          <h3 className="text-lg font-bold text-secondary-700 mt-4">
            No orders found
          </h3>
          <p className="text-secondary-500 text-sm mt-1">
            You have no orders with this status yet.
          </p>
          <Link href="/products" className="btn-primary mt-5 px-6!">
            Start Shopping <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block card-soft overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-secondary-500 text-xs uppercase tracking-wide">
                  <th className="text-left font-semibold px-5 py-3.5">
                    Order Number
                  </th>
                  <th className="text-left font-semibold px-5 py-3.5">Date</th>
                  <th className="text-left font-semibold px-5 py-3.5">
                    Status
                  </th>
                  <th className="text-left font-semibold px-5 py-3.5">Items</th>
                  <th className="text-left font-semibold px-5 py-3.5">Total</th>
                  <th className="text-right font-semibold px-5 py-3.5">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-gray-100 hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-5 py-4 font-bold text-secondary-700">
                      {order.orderNumber}
                    </td>
                    <td className="px-5 py-4 text-secondary-500">
                      {order.date.toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-4 text-secondary-600">
                      {order.itemCount} items
                    </td>
                    <td className="px-5 py-4 font-bold text-secondary-700">
                      ${order.discountedTotal?.toFixed(2)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setSelected(order)}
                        className="inline-flex items-center gap-1.5 text-primary-600 font-semibold hover:underline"
                      >
                        <Eye size={15} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden flex flex-col gap-3">
            {filtered.map((order) => (
              <button
                key={order.id}
                onClick={() => setSelected(order)}
                className="card-soft p-4 text-left w-full"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-secondary-700">
                    {order.orderNumber}
                  </span>
                  <StatusBadge status={order.status} />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-secondary-500">
                    {order.date.toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    · {order.itemCount} items
                  </span>
                  <span className="font-bold text-secondary-700">
                    ${order.discountedTotal?.toFixed(2)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      <OrderDetailsDrawer order={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
