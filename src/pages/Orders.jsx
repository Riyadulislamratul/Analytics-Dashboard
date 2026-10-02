import {
  ShoppingCart,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

function Orders() {
  const orders = [
    {
      id: "#0001",
      customer: "John Smith",
      products: 3,
      amount: "$1,249",
      status: "Completed",
    },
    {
      id: "#0002",
      customer: "Sarah Wilson",
      products: 2,
      amount: "$849",
      status: "Pending",
    },
    {
      id: "#0003",
      customer: "Michael Brown",
      products: 5,
      amount: "$2,150",
      status: "Completed",
    },
    {
      id: "#0004",
      customer: "Emma Davis",
      products: 1,
      amount: "$499",
      status: "Cancelled",
    },
    {
      id: "#0005",
      customer: "David Miller",
      products: 4,
      amount: "$1,599",
      status: "Completed",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "Completed") {
      return "bg-emerald-50 text-emerald-600";
    }

    if (status === "Pending") {
      return "bg-amber-50 text-amber-600";
    }

    return "bg-red-50 text-red-600";
  };

  const getStatusIcon = (status) => {
    if (status === "Completed") {
      return <CheckCircle2 size={14} />;
    }

    if (status === "Pending") {
      return <Clock3 size={14} />;
    }

    return <XCircle size={14} />;
  };

  return (
    <main className="flex-1 overflow-hidden bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] animate-fade-up">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-slate-600">
              Orders
            </span>
          </div>

          <h1 className="font-['Manrope'] text-3xl font-extrabold text-slate-900">
            Orders
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage and monitor your customer orders.
          </p>
        </div>

        {/* Summary */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ShoppingCart size={21} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Total Orders
                </p>

                <p className="font-['Manrope'] text-2xl font-bold text-slate-900">
                  128
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Completed
            </p>

            <p className="mt-1 font-['Manrope'] text-2xl font-bold text-emerald-600">
              96
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Pending
            </p>

            <p className="mt-1 font-['Manrope'] text-2xl font-bold text-amber-600">
              18
            </p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <h2 className="font-['Manrope'] text-lg font-bold text-slate-900">
              Recent Orders
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-4 font-medium">
                    Order
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Customer
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Products
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Amount
                  </th>

                  <th className="px-6 py-4 text-right font-medium">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-slate-50 transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-5 font-semibold text-slate-700">
                      {order.id}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {order.customer}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-500">
                      {order.products} products
                    </td>

                    <td className="px-6 py-5 font-semibold text-slate-800">
                      {order.amount}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end">
                        <span
                          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(
                            order.status
                          )}

                          {order.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Orders;