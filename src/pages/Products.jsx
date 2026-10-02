import { Package, Star } from "lucide-react";

function Products() {
  const products = [
    {
      name: "Essence Mascara Lash Princess",
      category: "Beauty",
      price: "$9.99",
      rating: 4.8,
    },
    {
      name: "Apple MacBook Pro",
      category: "Laptops",
      price: "$1,999",
      rating: 4.9,
    },
    {
      name: "Samsung Galaxy S24",
      category: "Smartphones",
      price: "$899",
      rating: 4.7,
    },
    {
      name: "Nike Air Max",
      category: "Shoes",
      price: "$149",
      rating: 4.6,
    },
    {
      name: "iPhone 15 Pro",
      category: "Smartphones",
      price: "$1,099",
      rating: 4.9,
    },
  ];

  return (
    <main className="flex-1 overflow-hidden bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] animate-fade-up">
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-slate-600">
              Products
            </span>
          </div>

          <h1 className="font-['Manrope'] text-3xl font-extrabold text-slate-900">
            Products
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your product catalog.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {products.map((product, index) => (
            <div
              key={product.name}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex h-40 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50">
                <Package
                  size={45}
                  className="text-slate-300 transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div className="p-5">
                <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">
                  {product.category}
                </span>

                <h3 className="mt-3 line-clamp-2 font-semibold text-slate-800">
                  {product.name}
                </h3>

                <div className="mt-4 flex items-center justify-between">
                  <span className="font-['Manrope'] text-lg font-bold text-slate-900">
                    {product.price}
                  </span>

                  <span className="flex items-center gap-1 text-sm text-slate-500">
                    <Star
                      size={14}
                      className="fill-yellow-400 text-yellow-400"
                    />

                    {product.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Products;