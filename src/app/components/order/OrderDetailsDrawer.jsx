import { X, Package, MapPin, Truck } from "lucide-react";
import StatusBadge from "./StatusBadge";
import Image from "next/image";

export default function OrderDetailsDrawer({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white overflow-y-auto animate-[slideIn_0.25s_ease]">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-5 flex items-center justify-between z-10">
          <div>
            <p className="text-xs text-gray-400">Order</p>
            <h3 className="font-extrabold text-secondary-700 text-lg">
              {order.orderNumber}
            </h3>
          </div>
          <button onClick={onClose} className="btn-ghost-icon">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary-500">Status</span>
            <StatusBadge status={order.status} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary-500">Order Date</span>
            <span className="text-sm font-semibold text-secondary-700">
              {order.date.toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="card-soft p-4 flex items-start gap-3">
            <Truck size={18} className="text-primary-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-secondary-700">
                {order.status === "Delivered"
                  ? "Delivered to your address"
                  : order.status === "Cancelled"
                    ? "Order cancelled"
                    : "Preparing for shipment"}
              </p>
              <p className="text-xs text-secondary-500 mt-1">
                {order.status === "Delivered"
                  ? "Package was handed over successfully."
                  : order.status === "Cancelled"
                    ? "This order was cancelled and refunded."
                    : "Your order is being processed and will ship soon."}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-secondary-700 mb-3 flex items-center gap-2">
              <Package size={16} /> Items ({order.itemCount})
            </h4>
            <div className="flex flex-col gap-3">
              {order.items.map((p) => (
                <div
                  key={p.id}
                  className="flex gap-3 items-center card-soft p-3"
                >
                  <Image
                    src={p.thumbnail}
                    alt={p.title}
                    width={100}
                    height={100}
                    className="w-12 h-12 object-contain rounded-lg bg-gray-50 p-1"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-secondary-700 line-clamp-1">
                      {p.title}
                    </p>
                    <p className="text-xs text-gray-400">Qty: {p.quantity}</p>
                  </div>
                  <span className="text-sm font-bold text-secondary-700">
                    ${p.total?.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-soft p-4 flex items-start gap-3">
            <MapPin size={18} className="text-primary-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-secondary-700">
                Shipping Address
              </p>
              <p className="text-xs text-secondary-500 mt-1">
                221B Corniche Road, Alexandria, Egypt
              </p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-secondary-500">Subtotal</span>
              <span className="font-semibold text-secondary-700">
                ${order.total?.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-500">Discount</span>
              <span className="font-semibold text-success-600">
                -${(order.total - order.discountedTotal).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-100">
              <span className="font-bold text-secondary-700">Total Paid</span>
              <span className="font-extrabold text-secondary-700 text-lg">
                ${order.discountedTotal?.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
