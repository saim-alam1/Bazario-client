import { Helmet } from "react-helmet-async";
import useAuth from "../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../UI/Loading/Loading";
import { useState } from "react";
import LottiePlayer from "lottie-react";
import noData from "../../../../assets/noData.json";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const Lottie = LottiePlayer.default || LottiePlayer;

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`orders/${user?.email}`);
      return res.data;
    },
  });

  const [filters, setFilters] = useState({
    search: "",
    min: "",
    max: "",
    sort: "newest",
  });

  // Filtering Logic
  const filteredOrders = orders
    .filter((order) =>
      order.productName.toLowerCase().includes(filters.search.toLowerCase()),
    )
    .filter((order) => {
      const min = filters.min ? Number(filters.min) : 0;
      const max = filters.max ? Number(filters.max) : Infinity;
      return order.totalPrice >= min && order.totalPrice <= max;
    })
    .sort((a, b) => {
      if (filters.sort === "price-low") return a.totalPrice - b.totalPrice;
      if (filters.sort === "price-high") return b.totalPrice - a.totalPrice;
      if (filters.sort === "oldest")
        return new Date(a.orderedAt) - new Date(b.orderedAt);
      return new Date(b.orderedAt) - new Date(a.orderedAt);
    });

  if (isLoading) return <Loading />;

  return (
    <section className="container mx-auto py-10 px-4">
      <Helmet>
        <title>My Orders | Dashboard</title>
      </Helmet>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>
        <p className="text-gray-500">Track and manage your recent purchases.</p>
      </div>

      {/* Professional Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-4 mb-6 items-end">
        <div className="flex-1 min-w-50">
          <label className="text-xs font-semibold uppercase text-gray-400">
            Search
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            placeholder="Product name..."
            className="input input-sm input-bordered w-full"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          {/* Min */}
          <input
            type="number"
            value={filters.min}
            onChange={(e) => setFilters({ ...filters, min: e.target.value })}
            placeholder="Min ৳"
            className="input input-sm input-bordered w-24"
          />
          {/* Max */}
          <input
            type="number"
            value={filters.max}
            onChange={(e) => setFilters({ ...filters, max: e.target.value })}
            placeholder="Max ৳"
            className="input input-sm input-bordered w-24"
          />
        </div>
        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          className="select select-sm select-bordered"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
        <button
          onClick={() =>
            setFilters({
              search: "",
              min: "",
              max: "",
              sort: "newest",
            })
          }
          className="btn btn-sm btn-ghost"
        >
          Reset
        </button>
      </div>

      {/* Orders Table */}
      {filteredOrders.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-sm">
          <table className="table w-full">
            <thead className="bg-gray-50">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={order.productImage} alt="product" />
                        </div>
                      </div>
                      <div className="font-bold">{order.productName}</div>
                    </div>
                  </td>
                  <td className="font-semibold">৳{order.totalPrice}</td>
                  <td>
                    <span
                      className={`badge ${order.paymentStatus === "paid" ? "badge-success" : "badge-error"} text-white`}
                    >
                      {order.paymentStatus.charAt(0).toUpperCase() +
                        order.paymentStatus.slice(1)}
                    </span>
                  </td>
                  <td>
                    <span className="font-medium text-gray-600">
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="text-gray-500">
                    {new Date(order.orderedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <Lottie animationData={noData} loop={true} className="w-72 md:w-96" />

          <h3 className="text-3xl font-semibold text-headings">
            Your order data is empty
          </h3>

          <p className="text-descriptions mt-2">
            Looks like you haven't ordered any products yet.
          </p>
        </div>
      )}
    </section>
  );
};

export default MyOrders;
