import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`} className="h-full">
      <div className="border rounded-xl p-4 hover:shadow transition bg-white h-full flex flex-col">
        <div className="h-40 flex items-center justify-center bg-gray-50 rounded-lg">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title || "Product"}
              width={100}
              height={100}
              loading="lazy"
              style={{ height: "auto" }}
              className="max-h-36 w-auto object-contain"
            />
          ) : (
            <div className="text-gray-400 text-sm">No image</div>
          )}
        </div>

        <h3 className="mt-3 font-semibold line-clamp-2">{product.title}</h3>

        <p className="text-sm text-gray-600 mt-1 capitalize">
          {product.category}
        </p>

        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="font-bold">${product.price}</span>
          <span className="text-sm text-gray-500">
            ⭐ {product.rating?.rate} ({product.rating?.count})
          </span>
        </div>
      </div>
    </Link>
  );
}
