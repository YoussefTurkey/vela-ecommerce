export default function ProductCardSkeleton() {
  return (
    <div className="card-soft overflow-hidden">
      <div className="aspect-square skeleton" />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-3 w-16 skeleton rounded-full" />
        <div className="h-4 w-full skeleton rounded-full" />
        <div className="h-4 w-2/3 skeleton rounded-full" />
        <div className="h-5 w-20 skeleton rounded-full mt-1" />
        <div className="h-9 w-full skeleton rounded-xl mt-1" />
      </div>
    </div>
  );
}
