import { Helmet } from "react-helmet-async";
import useAuth from "../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../UI/Loading/Loading";
import { useState } from "react";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["customer-orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`customer-orders/${user?.email}`);
      return res.data;
    },
  });

  const [filters, setFilters] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
    sort: "newest",
  });

  const filteredOrders = orders
    .filter((order) =>
      order.productName.toLowerCase().includes(filters.search.toLowerCase()),
    )
    .filter((order) => {
      const min = filters.minPrice ? Number(filters.minPrice) : 0;
      const max = filters.maxPrice ? Number(filters.maxPrice) : Infinity;

      return order.totalPrice >= min && order.totalPrice <= max;
    })
    .sort((a, b) => {
      console.log(a.totalPrice);
      if (filters.sort === "price-low") return a.totalPrice - b.totalPrice;
      if (filters.sort === "price-high") return b.totalPrice - a.totalPrice;
      if (filters.sort === "oldest")
        return new Date(a.orderedAt) - new Date(b.orderedAt);

      return new Date(b.orderedAt) - new Date(a.orderedAt);
    });

  if (isLoading) return <Loading />;

  return (
    <section className="my-14 px-3">
      <Helmet>
        <title>{`${user?.displayName} Orders | Dashboard`}</title>
        <meta
          name="description"
          content="See the products you ordered, your order & transaction details."
        />
      </Helmet>

      <div>
        <h2 className="text-xl font-semibold">{user?.displayName}'s orders</h2>

        <div className="max-w-9/12 mx-auto my-10 bg-white p-5 rounded-lg border border-gray-200 h-fit space-y-6">
          {/* Search */}
          <div>
            <label className="font-medium">Search Product</label>

            <input
              type="text"
              placeholder="Product Name"
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="input input-bordered w-full"
            />
          </div>

          {/* Price */}
          <div>
            <label className="font-medium">Price Range</label>

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                onChange={(e) =>
                  setFilters({ ...filters, minPrice: e.target.value })
                }
                className="input input-bordered w-full"
              />

              <input
                type="number"
                placeholder="Max"
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: e.target.value })
                }
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="font-medium">Sort By</label>

            <select
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
              className="select select-bordered w-full"
            >
              <option value="newest">Newest First</option>

              <option value="oldest">Oldest First</option>

              <option value="price-low">Lowest Amount</option>

              <option value="price-high">Highest Amount</option>
            </select>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() =>
              setFilters({
                search: "",
                category: "",
                minPrice: "",
                maxPrice: "",
                availability: "",
                flashDiscount: false,
                sort: "newest",
              })
            }
            className="btn btn-outline w-full"
          >
            Clear Filters
          </button>
        </div>

        <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
          <table className="w-full border-collapse">
            {/* Table Head */}
            <thead className="bg-gray-100 text-left text-sm">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Total Price</th>
                <th className="p-4">Payment Status</th>
                <th className="p-4">Trx. Id</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Ordered At</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-300 hover:bg-gray-50 transition"
                >
                  {/* Product */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={order.productImage}
                        alt={order.productName}
                        className="w-14 h-14 rounded-md object-cover shrink-0"
                      />

                      <div>
                        <h4 className="font-medium text-headings truncate">
                          {order.productName}
                        </h4>
                      </div>
                    </div>
                  </td>

                  {/* Quantity */}
                  <td className="p-4 font-medium text-headings whitespace-nowrap">
                    {order.quantity}
                  </td>

                  {/* Total Price */}
                  <td className="p-4 font-medium text-headings whitespace-nowrap">
                    {order.totalPrice}৳
                  </td>

                  {/* Payment Status */}
                  <td
                    className={`${order.paymentStatus === "paid" ? "text-green-600" : "text-red-500"} p-4 font-medium whitespace-nowrap`}
                  >
                    {order.paymentStatus.charAt(0).toUpperCase() +
                      order.paymentStatus.slice(1)}
                  </td>

                  {/* Transaction Id */}
                  <td className="p-4 font-medium whitespace-nowrap">
                    {order.transactionId}
                  </td>

                  {/* Status */}
                  <td
                    className={`${order.orderStatus === "Delivered" ? "text-green-500" : "text-yellow-600"} p-4 font-medium whitespace-nowrap`}
                  >
                    {order.orderStatus}
                  </td>

                  {/* Ordered At */}
                  <td className="p-4 font-medium text-headings whitespace-nowrap">
                    {new Date(order.orderedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default MyOrders;
