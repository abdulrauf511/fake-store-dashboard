export default function ProductCardSkeleton() {
  return (
    <div className="border rounded-xl p-4 bg-white animate-pulse">
      <div className="h-40 bg-gray-100 rounded-lg" />
      <div className="mt-3 h-4 bg-gray-100 rounded w-3/4" />
      <div className="mt-2 h-3 bg-gray-100 rounded w-1/2" />
      <div className="mt-4 flex justify-between">
        <div className="h-4 bg-gray-100 rounded w-16" />
        <div className="h-4 bg-gray-100 rounded w-20" />
      </div>
    </div>
  );
}
