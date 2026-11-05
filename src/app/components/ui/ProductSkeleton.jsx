import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="container-app py-10 grid md:grid-cols-2 gap-10">
      <div className="aspect-square skeleton rounded-app" />
      <div className="flex flex-col gap-4">
        <div className="h-6 w-1/3 skeleton rounded-full" />
        <div className="h-9 w-3/4 skeleton rounded-full" />
        <div className="h-5 w-1/2 skeleton rounded-full" />
        <div className="h-24 w-full skeleton rounded-app" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
