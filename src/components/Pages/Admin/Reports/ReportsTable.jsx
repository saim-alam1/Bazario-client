import LottiePlayer from "lottie-react";
import noData from "../../../../assets/noData.json";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../UI/Loading/Loading";
import { Link } from "react-router";

const ReportsTable = () => {
  const { user } = useAuth();
  const Lottie = LottiePlayer.default || LottiePlayer;
  const axiosSecure = useAxiosSecure();

  const { data: customerReports = [], isLoading } = useQuery({
    queryKey: ["customer-reports", user?.email],
    queryFn: async () => {
      const res = await axiosSecure("customer-reports");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (customerReports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="w-64 h-64">
          <Lottie animationData={noData} loop={true} />
        </div>
        <h3 className="text-xl font-bold text-gray-700 mt-4">
          No Reports Found
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          Everything looks clean right now!
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-sm">
      <table className="table w-full">
        {/* Table Head */}
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="py-4">Product</th>
            <th>Reporter Email</th>
            <th>Vendor Email</th>
            <th>Subject</th>
            <th>Complaint Message</th>
            <th>Reported Date</th>
            <th className="text-right pr-6 pl-12">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-100">
          {customerReports.map((report) => (
            <tr key={report._id} className="hover:bg-gray-50/60 transition">
              {/* Product */}
              <td className="py-4">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squirrel w-11 h-11 border border-gray-100">
                      <img
                        src={report.productImage}
                        alt="product"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="font-medium text-gray-800 whitespace-nowrap">
                    {report.productName}
                  </div>
                </div>
              </td>

              {/* Reporter Email */}
              <td className="text-gray-600 text-sm">{report.customerEmail}</td>

              {/* Vendor Email */}
              <td className="text-gray-600 text-sm">{report.vendorEmail}</td>

              {/* Subject */}
              <td className="text-gray-700 text-sm font-medium whitespace-nowrap">
                {report.subject}
              </td>

              {/* Message - Full view, wrapped naturally */}
              <td className="text-gray-500 text-sm min-w-62.5 leading-relaxed italic">
                {report.reportMessage}
              </td>

              {/* Date */}
              <td className="text-gray-500 text-sm whitespace-nowrap">
                {new Date(report.reportedAt).toLocaleDateString("en-GB")}
              </td>

              {/* Actions - Grouped into a single clean cell with left padding spacing */}
              <td>
                <Link
                  to="/dashboard-layout/manage-vendors"
                  className="btn btn-success border-none shadow-none whitespace-nowrap"
                >
                  Manage Vendor
                </Link>
              </td>

              <td>
                <button className="btn btn-error border-none shadow-none whitespace-nowrap">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTable;
