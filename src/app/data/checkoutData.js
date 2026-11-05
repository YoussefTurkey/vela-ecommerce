import { Banknote, CreditCard, Wallet } from "lucide-react";

export const DELIVERY_METHODS = [
  {
    id: "standard",
    label: "Standard Delivery",
    sub: "5-7 business days",
    price: 0,
  },
  {
    id: "express",
    label: "Express Delivery",
    sub: "2-3 business days",
    price: 12.99,
  },
  {
    id: "overnight",
    label: "Overnight Delivery",
    sub: "Next business day",
    price: 24.99,
  },
];

export const PAYMENT_METHODS = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "wallet", label: "Digital Wallet", icon: Wallet },
  { id: "cod", label: "Cash on Delivery", icon: Banknote },
];
