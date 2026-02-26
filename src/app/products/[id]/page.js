import Link from "next/link";
import { fetchProductById } from "../../../lib/products";
import Image from "next/image";

function money(n) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(n);
  } catch {
    return `$${n}`;
  }
}

function Stars({ value = 0 }) {
  const rounded = Math.round(value * 2) / 2;
  const full = Math.floor(rounded);
  const half = rounded - full === 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: full }).map((_, i) => (
        <span key={`f-${i}`} className="text-yellow-500">
          ★
        </span>
      ))}
      {half && <span className="text-yellow-500">⯪</span>}
      {Array.from({ length: empty }).map((_, i) => (
        <span key={`e-${i}`} className="text-gray-300">
          ★
        </span>
      ))}
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center px-2 py-1 rounded text-xs border bg-gray-50 text-gray-700">
      {children}
    </span>
  );
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  let product;
  try {
    product = await fetchProductById(id);
    // Validate required product fields
    if (!product || !product.id || !product.title || !product.price) {
      throw new Error("Invalid product data");
    }
  } catch (e) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-sm text-gray-700 hover:underline">
            ← Back
          </Link>

          <div className="mt-6 bg-white border rounded-xl p-6">
            <h1 className="text-xl font-bold">Product not found</h1>
            <p className="text-gray-600 mt-2">Could not load product {id}.</p>
          </div>
        </div>
      </main>
    );
  }

  const ratingValue = product?.rating?.rate ?? 0;
  const ratingCount = product?.rating?.count ?? 0;

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Top header (Amazon-like simple) */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="text-sm text-gray-700 hover:underline">
            ← Back to dashboard
          </Link>
          <span className="text-xs text-gray-500">
            Product ID: {product.id}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumb-ish */}
        <div className="text-xs text-gray-600 mb-3">
          <span className="hover:underline cursor-pointer">Dashboard</span>{" "}
          <span className="text-gray-400">›</span>{" "}
          <span className="capitalize hover:underline cursor-pointer">
            {product.category}
          </span>{" "}
          <span className="text-gray-400">›</span>{" "}
          <span className="text-gray-900 line-clamp-1">{product.title}</span>
        </div>

        {/* Main layout: image | details | buy box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Image column */}
          <div className="lg:col-span-4">
            <div className="bg-white border rounded-xl p-4">
              <div className="bg-white rounded-lg border p-4 flex items-center justify-center">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title || "Product image"}
                    width={360}
                    height={360}
                    style={{ height: "auto" }}
                    className="max-h-90 w-auto object-contain"
                  />
                ) : (
                  <div className="text-gray-400">No image available</div>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="capitalize">{product.category}</Badge>
                <Badge>Ships fast</Badge>
                <Badge>Free returns</Badge>
              </div>
            </div>
          </div>

          {/* Details column */}
          <div className="lg:col-span-5">
            <div className="bg-white border rounded-xl p-5">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                {product.title}
              </h1>

              <div className="mt-2 flex items-center gap-2">
                <Stars value={ratingValue} />
                <span className="text-sm text-blue-700 hover:underline cursor-pointer">
                  {ratingValue.toFixed(1)}
                </span>
                <span className="text-sm text-gray-500">({ratingCount})</span>
              </div>

              <div className="mt-3 text-sm text-gray-600">
                Category:{" "}
                <span className="font-medium text-gray-900 capitalize">
                  {product.category}
                </span>
              </div>

              <hr className="my-4" />

              {/* Price + availability */}
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-sm text-gray-500">Price</div>
                  <div className="text-3xl font-extrabold text-gray-900">
                    {money(product.price)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Inclusive of taxes (demo)
                  </div>
                </div>

                <div className="text-sm">
                  <span className="inline-flex items-center px-2 py-1 rounded bg-green-50 border border-green-100 text-green-700">
                    In stock
                  </span>
                </div>
              </div>

              {/* Compact info list */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="border rounded-lg p-3 bg-gray-50">
                  <div className="text-xs text-gray-500">Delivery</div>
                  <div className="font-medium text-gray-900">1–3 days</div>
                </div>
                <div className="border rounded-lg p-3 bg-gray-50">
                  <div className="text-xs text-gray-500">Return policy</div>
                  <div className="font-medium text-gray-900">30 days</div>
                </div>
              </div>

              <hr className="my-4" />

              {/* Description (preview) */}
              <h2 className="text-sm font-bold text-gray-900">
                About this item
              </h2>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Buy box column */}
          <div className="lg:col-span-3">
            <div className="bg-white border rounded-xl p-5 lg:sticky lg:top-5">
              <div className="text-2xl font-extrabold text-gray-900">
                {money(product.price)}
              </div>

              <div className="mt-2 text-sm text-gray-600">
                FREE delivery{" "}
                <span className="font-medium text-gray-900">Tomorrow</span>
                <div className="text-xs text-gray-500 mt-1">
                  (Demo text for Amazon-like feel)
                </div>
              </div>

              <div className="mt-3 text-sm">
                <span className="text-green-700 font-medium">In stock</span>
              </div>

              {/* Quantity */}
              <div className="mt-4">
                <label className="text-xs text-gray-600">Qty</label>
                <select className="mt-1 w-full border rounded-lg px-3 py-2 text-sm bg-white">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>

              {/* Actions */}
              <div className="mt-4 space-y-2">
                <button className="w-full px-4 py-3 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium">
                  Add to Cart
                </button>
                <button className="w-full px-4 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium">
                  Buy Now
                </button>
              </div>

              <div className="mt-4 text-xs text-gray-500 border-t pt-4 space-y-1">
                <div className="flex justify-between">
                  <span>Ships from</span>
                  <span className="text-gray-900 font-medium">FakeStore</span>
                </div>
                <div className="flex justify-between">
                  <span>Sold by</span>
                  <span className="text-gray-900 font-medium">FakeStore</span>
                </div>
                <div className="flex justify-between">
                  <span>Returns</span>
                  <span className="text-gray-900 font-medium">30-day</span>
                </div>
              </div>

              <p className="mt-3 text-[11px] text-gray-500">
                Buttons are UI only for now. Next we can add cart state with
                Context + reducer.
              </p>
            </div>
          </div>
        </div>

        {/* Full description section (below) */}
        <div className="mt-4 bg-white border rounded-xl p-5">
          <h2 className="text-base font-bold text-gray-900">
            Product description
          </h2>
          <p className="mt-2 text-sm text-gray-700 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="border rounded-lg p-3 bg-gray-50">
              <div className="text-xs text-gray-500">Category</div>
              <div className="font-medium text-gray-900 capitalize">
                {product.category}
              </div>
            </div>
            <div className="border rounded-lg p-3 bg-gray-50">
              <div className="text-xs text-gray-500">Rating</div>
              <div className="font-medium text-gray-900">
                {ratingValue.toFixed(1)} / 5
              </div>
            </div>
            <div className="border rounded-lg p-3 bg-gray-50">
              <div className="text-xs text-gray-500">Reviews</div>
              <div className="font-medium text-gray-900">{ratingCount}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
