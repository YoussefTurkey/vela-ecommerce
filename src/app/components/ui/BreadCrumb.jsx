import Link from "next/link";
import React from "react";

const BreadCrumb = ({ product }) => {
  return (
    <div className="flex items-center gap-1.5 text-xs text-secondary-500 mb-6 flex-wrap">
      <Link href="/" className="hover:text-primary-600">
        Home
      </Link>{" "}
      /
      <Link href="/products" className="hover:text-primary-600">
        Products
      </Link>{" "}
      /
      <Link
        href={`/products?category=${product.category}`}
        className="hover:text-primary-600 capitalize"
      >
        {product.category?.replace(/-/g, " ")}
      </Link>
      <span className="text-secondary-700 font-medium truncate max-w-50">
        {product.title}
      </span>
    </div>
  );
};

export default BreadCrumb;
