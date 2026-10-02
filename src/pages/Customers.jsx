import { Mail, MapPin, Users } from "lucide-react";

function Customers() {
  const customers = [
    {
      name: "John Smith",
      email: "john@example.com",
      location: "New York, USA",
    },
    {
      name: "Sarah Wilson",
      email: "sarah@example.com",
      location: "London, UK",
    },
    {
      name: "Michael Brown",
      email: "michael@example.com",
      location: "Toronto, Canada",
    },
    {
      name: "Emma Davis",
      email: "emma@example.com",
      location: "Sydney, Australia",
    },
    {
      name: "David Miller",
      email: "david@example.com",
      location: "Berlin, Germany",
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
              Customers
            </span>
          </div>

          <h1 className="font-['Manrope'] text-3xl font-extrabold text-slate-900">
            Customers
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View and manage your customer base.
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Users size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Total Customers
              </p>

              <p className="font-['Manrope'] text-3xl font-extrabold text-slate-900">
                100
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {customers.map((customer) => (
            <div
              key={customer.email}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 font-bold text-white">
                  {customer.name.charAt(0)}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-slate-800">
                    {customer.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                    <Mail size={14} />
                    {customer.email}
                  </div>

                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                    <MapPin size={14} />
                    {customer.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Customers;