import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-xl p-4 hover:shadow transition bg-white">
      <div className="h-40 flex items-center justify-center bg-gray-50 rounded-lg">
        <Image
          src={product.image}
          alt={product.title}
          width={100}
          height={100}
          loading="eager"
          className="max-h-36 w-auto object-contain"
        />
      </div>

      <h3 className="mt-3 font-semibold line-clamp-2">{product.title}</h3>

      <p className="text-sm text-gray-600 mt-1 capitalize">
        {product.category}
      </p>

      <div className="mt-3 flex items-center justify-between">
        <span className="font-bold">${product.price}</span>
        <span className="text-sm text-gray-500">
          ⭐ {product.rating?.rate} ({product.rating?.count})
        </span>
      </div>
    </div>
  );
}
