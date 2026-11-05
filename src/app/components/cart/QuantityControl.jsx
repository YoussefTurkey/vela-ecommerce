import { Minus, Plus } from "lucide-react";

const QuantityControl = ({ item, updateQuantity }) => {
  return (
    <div className="flex items-center border border-gray-200 rounded-full">
      <button
        onClick={() => updateQuantity(item.id, item.quantity - 1)}
        className="w-8 h-8 flex items-center justify-center text-secondary-600 hover:text-primary-600"
      >
        <Minus size={13} />
      </button>
      <span className="w-8 text-center text-sm font-bold text-secondary-700">
        {item.quantity}
      </span>
      <button
        onClick={() => updateQuantity(item.id, item.quantity + 1)}
        className="w-8 h-8 flex items-center justify-center text-secondary-600 hover:text-primary-600"
      >
        <Plus size={13} />
      </button>
    </div>
  );
};

export default QuantityControl;
