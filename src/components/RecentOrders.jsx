function RecentOrders({ carts }) {
  const recentOrders = carts.slice(0, 6);

  return (
    <div className="overflow-x-auto">

      <table className="w-full min-w-[600px]">

        <thead>
          <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wider text-slate-400">

            <th className="pb-4 font-medium">
              Order
            </th>

            <th className="pb-4 font-medium">
              Products
            </th>

            <th className="pb-4 font-medium">
              Total
            </th>

            <th className="pb-4 text-right font-medium">
              Status
            </th>

          </tr>
        </thead>

        <tbody>

          {recentOrders.map((cart) => (
            <tr
              key={cart.id}
              className="border-b border-slate-50 last:border-none"
            >

              <td className="py-4">
                <span className="font-semibold text-slate-700">
                  #{cart.id.toString().padStart(4, "0")}
                </span>
              </td>

              <td className="py-4">

                <span className="text-sm text-slate-500">
                  {cart.totalProducts} products
                </span>

              </td>

              <td className="py-4 font-semibold">
                ${cart.total.toLocaleString()}
              </td>

              <td className="py-4 text-right">

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                  Completed
                </span>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default RecentOrders;