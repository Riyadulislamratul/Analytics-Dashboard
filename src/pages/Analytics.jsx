import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  ArrowUpRight,
} from "lucide-react";

function Analytics() {
  const metrics = [
    {
      title: "Conversion Rate",
      value: "8.42%",
      change: "+2.4%",
      icon: TrendingUp,
      style: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Average Order Value",
      value: "$284.50",
      change: "+8.2%",
      icon: DollarSign,
      style: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Customer Growth",
      value: "15.8%",
      change: "+4.1%",
      icon: Users,
      style: "bg-purple-50 text-purple-600",
    },
    {
      title: "Order Growth",
      value: "12.6%",
      change: "+3.8%",
      icon: ShoppingCart,
      style: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <main className="flex-1 overflow-hidden bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] animate-fade-up">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-slate-600">
              Analytics
            </span>
          </div>

          <h1 className="font-['Manrope'] text-3xl font-extrabold text-slate-900">
            Analytics
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Analyze your business performance and growth.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;

            return (
              <div
                key={metric.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${metric.style}`}
                  >
                    <Icon size={21} />
                  </div>

                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                    <ArrowUpRight size={14} />
                    {metric.change}
                  </span>
                </div>

                <p className="mt-5 text-sm text-slate-500">
                  {metric.title}
                </p>

                <h2 className="mt-1 font-['Manrope'] text-2xl font-extrabold text-slate-900">
                  {metric.value}
                </h2>
              </div>
            );
          })}
        </div>

        {/* Analytics Placeholder */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <TrendingUp size={30} />
            </div>

            <h2 className="mt-5 font-['Manrope'] text-2xl font-bold text-slate-900">
              Advanced Analytics
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
              Revenue trends, customer growth, conversion
              rates, product performance and comparison
              charts will be added here.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Analytics;