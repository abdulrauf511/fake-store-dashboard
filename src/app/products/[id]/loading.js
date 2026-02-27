export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="h-3 w-80 bg-gray-200 rounded animate-pulse mb-3" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Image */}
          <div className="lg:col-span-4">
            <div className="bg-white border rounded-xl p-4">
              <div className="h-105 bg-gray-200 rounded-lg animate-pulse" />
              <div className="mt-3 flex gap-2">
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5">
            <div className="bg-white border rounded-xl p-5">
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="mt-3 h-4 w-40 bg-gray-200 rounded animate-pulse" />
              <div className="mt-3 h-4 w-56 bg-gray-200 rounded animate-pulse" />
              <div className="my-4 h-px bg-gray-200" />
              <div className="h-10 w-40 bg-gray-200 rounded animate-pulse" />
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="h-16 bg-gray-200 rounded animate-pulse" />
                <div className="h-16 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="my-4 h-px bg-gray-200" />
              <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
              <div className="mt-2 space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* Buy box */}
          <div className="lg:col-span-3">
            <div className="bg-white border rounded-xl p-5">
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="mt-3 h-4 w-48 bg-gray-200 rounded animate-pulse" />
              <div className="mt-2 h-4 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="mt-4 h-10 w-full bg-gray-200 rounded animate-pulse" />
              <div className="mt-2 h-10 w-full bg-gray-200 rounded animate-pulse" />
              <div className="mt-4 h-px bg-gray-200" />
              <div className="mt-4 space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-white border rounded-xl p-5">
          <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
          <div className="mt-3 space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  );
}
