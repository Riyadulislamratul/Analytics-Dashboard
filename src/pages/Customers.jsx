
import { useEffect, useMemo, useState } from "react";

import {
  Search,
  Users,
  UserCheck,
  UserRound,
  Mail,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  MapPin,
  Phone,
  CalendarDays,
  SlidersHorizontal,
} from "lucide-react";

import { getUsers } from "../services/api";

function Customers() {
  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const customersPerPage = 8;

  // ---------------------------------------
  // Fetch Customers
  // ---------------------------------------

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getUsers();

      setCustomers(data.users || []);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load customers. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // ---------------------------------------
  // Filter + Search + Sort
  // ---------------------------------------

  const filteredCustomers = useMemo(() => {
    const result = customers.filter((customer) => {
      const search = searchTerm.toLowerCase();

      const fullName =
        `${customer.firstName} ${customer.lastName}`.toLowerCase();

      const matchesSearch =
        fullName.includes(search) ||
        customer.email
          ?.toLowerCase()
          .includes(search) ||
        customer.username
          ?.toLowerCase()
          .includes(search) ||
        customer.phone
          ?.toLowerCase()
          .includes(search);

      const matchesGender =
        genderFilter === "all" ||
        customer.gender === genderFilter;

      return matchesSearch && matchesGender;
    });

    // ---------------------------------------
    // Sorting
    // ---------------------------------------

    if (sortOption === "name") {
      result.sort((a, b) => {
        const nameA = `${a.firstName} ${a.lastName}`;
        const nameB = `${b.firstName} ${b.lastName}`;

        return nameA.localeCompare(nameB);
      });
    }

    if (sortOption === "name-reverse") {
      result.sort((a, b) => {
        const nameA = `${a.firstName} ${a.lastName}`;
        const nameB = `${b.firstName} ${b.lastName}`;

        return nameB.localeCompare(nameA);
      });
    }

    if (sortOption === "age-young") {
      result.sort((a, b) => a.age - b.age);
    }

    if (sortOption === "age-old") {
      result.sort((a, b) => b.age - a.age);
    }

    return result;
  }, [
    customers,
    searchTerm,
    genderFilter,
    sortOption,
  ]);

  // ---------------------------------------
  // Pagination
  // ---------------------------------------

  const totalPages = Math.ceil(
    filteredCustomers.length / customersPerPage
  );

  const startIndex =
    (currentPage - 1) * customersPerPage;

  const endIndex =
    startIndex + customersPerPage;

  const paginatedCustomers = filteredCustomers.slice(
    startIndex,
    endIndex
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, genderFilter, sortOption]);

  // ---------------------------------------
  // Statistics
  // ---------------------------------------

  const totalCustomers = customers.length;

  const maleCustomers = customers.filter(
    (customer) => customer.gender === "male"
  ).length;

  const femaleCustomers = customers.filter(
    (customer) => customer.gender === "female"
  ).length;

  const averageAge =
    customers.length > 0
      ? Math.round(
          customers.reduce(
            (total, customer) =>
              total + customer.age,
            0
          ) / customers.length
        )
      : 0;

  // ---------------------------------------
  // Loading State
  // ---------------------------------------

  if (loading) {
    return (
      <main className="flex flex-1 items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

          <p className="text-sm font-medium text-slate-500">
            Loading customers...
          </p>
        </div>
      </main>
    );
  }

  // ---------------------------------------
  // Error State
  // ---------------------------------------

  if (error) {
    return (
      <main className="flex flex-1 items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
            <RefreshCw size={22} />
          </div>

          <h2 className="font-['Manrope'] text-xl font-bold text-slate-900">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {error}
          </p>

          <button
            onClick={fetchCustomers}
            className="mt-6 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex-1 overflow-hidden bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Background decoration */}

      <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-indigo-500/5 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-violet-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1600px]">

        {/* ---------------------------------------
            Header
        --------------------------------------- */}

        <div className="mb-8 animate-fade-up">
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
            <span>Dashboard</span>

            <span>/</span>

            <span className="text-slate-600">
              Customers
            </span>
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-['Manrope'] text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Customers
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Manage customer information and view
                customer details.
              </p>
            </div>

            <button
              onClick={fetchCustomers}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
            >
              <RefreshCw size={16} />

              Refresh
            </button>
          </div>
        </div>

        {/* ---------------------------------------
            Statistics
        --------------------------------------- */}

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* Total Customers */}

          <div className="group animate-fade-up rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-transform duration-300 group-hover:scale-110">
                <Users size={21} />
              </div>

              <span className="rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
                Customers
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Total Customers
            </p>

            <h2 className="mt-1 font-['Manrope'] text-2xl font-extrabold text-slate-900">
              {totalCustomers}
            </h2>
          </div>

          {/* Male */}

          <div
            className="group animate-fade-up rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-110">
                <UserCheck size={21} />
              </div>

              <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                Male
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Male Customers
            </p>

            <h2 className="mt-1 font-['Manrope'] text-2xl font-extrabold text-slate-900">
              {maleCustomers}
            </h2>
          </div>

          {/* Female */}

          <div
            className="group animate-fade-up rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50 text-pink-600 transition-transform duration-300 group-hover:scale-110">
                <UserRound size={21} />
              </div>

              <span className="rounded-full bg-pink-50 px-2 py-1 text-xs font-semibold text-pink-600">
                Female
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Female Customers
            </p>

            <h2 className="mt-1 font-['Manrope'] text-2xl font-extrabold text-slate-900">
              {femaleCustomers}
            </h2>
          </div>

          {/* Average Age */}

          <div
            className="group animate-fade-up rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 transition-transform duration-300 group-hover:scale-110">
                <CalendarDays size={21} />
              </div>

              <span className="rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600">
                Age
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Average Age
            </p>

            <h2 className="mt-1 font-['Manrope'] text-2xl font-extrabold text-slate-900">
              {averageAge}
              <span className="ml-1 text-sm font-medium text-slate-400">
                years
              </span>
            </h2>
          </div>
        </div>

        {/* ---------------------------------------
            Filters
        --------------------------------------- */}

        <div className="mb-6 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

            {/* Search */}

            <div className="relative w-full xl:max-w-md">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search name, email, username or phone..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              {/* Gender Filter */}

              <div className="flex items-center gap-2">
                <SlidersHorizontal
                  size={17}
                  className="hidden text-slate-400 sm:block"
                />

                <select
                  value={genderFilter}
                  onChange={(event) =>
                    setGenderFilter(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium capitalize text-slate-600 outline-none transition focus:border-indigo-400 focus:bg-white sm:w-44"
                >
                  <option value="all">
                    All Genders
                  </option>

                  <option value="male">
                    Male
                  </option>

                  <option value="female">
                    Female
                  </option>
                </select>
              </div>

              {/* Sort */}

              <select
                value={sortOption}
                onChange={(event) =>
                  setSortOption(event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 outline-none transition focus:border-indigo-400 focus:bg-white sm:w-48"
              >
                <option value="default">
                  Sort: Default
                </option>

                <option value="name">
                  Name: A-Z
                </option>

                <option value="name-reverse">
                  Name: Z-A
                </option>

                <option value="age-young">
                  Age: Youngest
                </option>

                <option value="age-old">
                  Age: Oldest
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* ---------------------------------------
            Customer Table
        --------------------------------------- */}

        <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm animate-scale-in">

          <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-['Manrope'] text-lg font-bold text-slate-900">
                Customer Directory
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Showing {filteredCustomers.length} customers
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500">
              {customers.length} total customers
            </div>
          </div>

          {paginatedCustomers.length === 0 ? (
            <div className="flex min-h-[350px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Search size={24} />
              </div>

              <h3 className="mt-4 font-['Manrope'] text-lg font-bold text-slate-800">
                No customers found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filter.
              </p>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setGenderFilter("all");
                  setSortOption("default");
                }}
                className="mt-5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[950px]">

                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-400">

                      <th className="px-6 py-4 font-medium">
                        Customer
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Contact
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Gender
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Age
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Location
                      </th>

                      <th className="px-6 py-4 text-right font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedCustomers.map(
                      (customer) => {
                        const fullName = `${customer.firstName} ${customer.lastName}`;

                        return (
                          <tr
                            key={customer.id}
                            className="border-b border-slate-50 transition hover:bg-slate-50"
                          >

                            {/* Customer */}

                            <td className="px-6 py-5">
                              <div className="flex items-center gap-4">

                                <div className="relative">
                                  <img
                                    src={customer.image}
                                    alt={fullName}
                                    className="h-12 w-12 rounded-full border border-slate-100 object-cover"
                                  />

                                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                                </div>

                                <div className="min-w-0">
                                  <p className="font-semibold text-slate-800">
                                    {fullName}
                                  </p>

                                  <p className="mt-1 text-xs text-slate-400">
                                    @{customer.username}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Contact */}

                            <td className="px-6 py-5">
                              <div className="max-w-[230px]">
                                <div className="flex items-center gap-2">
                                  <Mail
                                    size={14}
                                    className="shrink-0 text-slate-400"
                                  />

                                  <span className="truncate text-sm text-slate-600">
                                    {customer.email}
                                  </span>
                                </div>

                                <div className="mt-1.5 flex items-center gap-2">
                                  <Phone
                                    size={14}
                                    className="shrink-0 text-slate-400"
                                  />

                                  <span className="text-xs text-slate-400">
                                    {customer.phone}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Gender */}

                            <td className="px-6 py-5">
                              <span
                                className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
                                  customer.gender ===
                                  "male"
                                    ? "bg-blue-50 text-blue-600"
                                    : "bg-pink-50 text-pink-600"
                                }`}
                              >
                                {customer.gender}
                              </span>
                            </td>

                            {/* Age */}

                            <td className="px-6 py-5">
                              <span className="font-semibold text-slate-700">
                                {customer.age}
                              </span>

                              <span className="ml-1 text-xs text-slate-400">
                                years
                              </span>
                            </td>

                            {/* Location */}

                            <td className="px-6 py-5">
                              <div className="flex items-center gap-2">
                                <MapPin
                                  size={15}
                                  className="shrink-0 text-slate-400"
                                />

                                <span className="text-sm text-slate-500">
                                  {customer.address.city}
                                </span>
                              </div>
                            </td>

                            {/* Action */}

                            <td className="px-6 py-5">
                              <div className="flex justify-end">
                                <button
                                  onClick={() =>
                                    setSelectedCustomer(
                                      customer
                                    )
                                  }
                                  className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                                >
                                  <Eye size={15} />

                                  View
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>

              {/* ---------------------------------------
                  Pagination
              --------------------------------------- */}

              <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                <p className="text-sm text-slate-500">
                  Showing{" "}
                  <span className="font-semibold text-slate-700">
                    {startIndex + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-slate-700">
                    {Math.min(
                      endIndex,
                      filteredCustomers.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-700">
                    {filteredCustomers.length}
                  </span>
                </p>

                <div className="flex items-center gap-2">

                  <button
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage(
                        (page) => page - 1
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={17} />
                  </button>

                  <span className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-slate-900 px-3 text-sm font-semibold text-white">
                    {currentPage}
                  </span>

                  <button
                    disabled={
                      currentPage >= totalPages
                    }
                    onClick={() =>
                      setCurrentPage(
                        (page) => page + 1
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight size={17} />
                  </button>

                </div>
              </div>
            </>
          )}
        </div>

        {/* ---------------------------------------
            Footer
        --------------------------------------- */}

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row">
          <p>
            © 2026 Analytics Dashboard. All rights
            reserved.
          </p>

          <p>
            Customers powered by DummyJSON
          </p>
        </div>
      </div>

      {/* ---------------------------------------
          Customer Details Modal
      --------------------------------------- */}

      {selectedCustomer && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl animate-scale-in"
          >

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                  Customer Details
                </p>

                <h2 className="mt-1 font-['Manrope'] text-xl font-extrabold text-slate-900">
                  {selectedCustomer.firstName}{" "}
                  {selectedCustomer.lastName}
                </h2>
              </div>

              <button
                onClick={() =>
                  setSelectedCustomer(null)
                }
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}

            <div className="p-5 sm:p-6">

              {/* Profile */}

              <div className="flex flex-col items-center gap-4 rounded-2xl bg-slate-50 p-6 sm:flex-row">
                <img
                  src={selectedCustomer.image}
                  alt={`${selectedCustomer.firstName} ${selectedCustomer.lastName}`}
                  className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-sm"
                />

                <div className="text-center sm:text-left">
                  <h3 className="font-['Manrope'] text-xl font-extrabold text-slate-900">
                    {selectedCustomer.firstName}{" "}
                    {selectedCustomer.lastName}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    @{selectedCustomer.username}
                  </p>

                  <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                        selectedCustomer.gender ===
                        "male"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-pink-50 text-pink-600"
                      }`}
                    >
                      {selectedCustomer.gender}
                    </span>

                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                      ID #{selectedCustomer.id}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Contact Information
                </p>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">

                  <div className="rounded-xl border border-slate-100 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <Mail size={17} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-slate-400">
                          Email
                        </p>

                        <p className="mt-0.5 truncate text-sm font-semibold text-slate-700">
                          {selectedCustomer.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-100 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                        <Phone size={17} />
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Phone
                        </p>

                        <p className="mt-0.5 text-sm font-semibold text-slate-700">
                          {selectedCustomer.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Personal Information */}

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Personal Information
                </p>

                <div className="mt-3 grid gap-3 sm:grid-cols-3">

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-400">
                      Age
                    </p>

                    <p className="mt-1 font-bold text-slate-800">
                      {selectedCustomer.age} years
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-400">
                      Birth Date
                    </p>

                    <p className="mt-1 font-bold text-slate-800">
                      {selectedCustomer.birthDate}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-400">
                      Blood Group
                    </p>

                    <p className="mt-1 font-bold text-slate-800">
                      {selectedCustomer.bloodGroup}
                    </p>
                  </div>

                </div>
              </div>

              {/* Address */}

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Address
                </p>

                <div className="mt-3 rounded-xl border border-slate-100 p-4">
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                      <MapPin size={17} />
                    </div>

                    <div>
                      <p className="font-semibold text-slate-800">
                        {selectedCustomer.address.address}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {selectedCustomer.address.city},{" "}
                        {selectedCustomer.address.state}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Postal Code:{" "}
                        {selectedCustomer.address.postalCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company */}

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Company
                </p>

                <div className="mt-3 rounded-xl bg-indigo-50 p-4">
                  <p className="font-bold text-indigo-800">
                    {selectedCustomer.company.name}
                  </p>

                  <p className="mt-1 text-sm text-indigo-600">
                    {selectedCustomer.company.title}
                  </p>

                  <p className="mt-1 text-xs text-indigo-400">
                    {selectedCustomer.company.department}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}

            <div className="flex justify-end border-t border-slate-100 bg-slate-50 p-5">
              <button
                onClick={() =>
                  setSelectedCustomer(null)
                }
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Customers;
