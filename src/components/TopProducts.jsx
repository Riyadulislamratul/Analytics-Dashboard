import { Star } from "lucide-react";

function TopProducts({ products }) {
  const topProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <div className="space-y-4">

      {topProducts.map((product, index) => (
        <div
          key={product.id}
          className="flex items-center gap-4 rounded-xl p-2 transition hover:bg-slate-50"
        >

          {/* Rank */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600">
            {index + 1}
          </div>

          {/* Image */}
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-12 w-12 rounded-lg object-cover"
          />

          {/* Product info */}
          <div className="min-w-0 flex-1">

            <p className="truncate text-sm font-semibold text-slate-800">
              {product.title}
            </p>

            <div className="mt-1 flex items-center gap-1">

              <Star
                size={13}
                className="fill-yellow-400 text-yellow-400"
              />

              <span className="text-xs text-slate-500">
                {product.rating}
              </span>

            </div>

          </div>

          {/* Price */}
          <p className="text-sm font-bold">
            ${product.price}
          </p>

        </div>
      ))}

    </div>
  );
}

export default TopProducts;