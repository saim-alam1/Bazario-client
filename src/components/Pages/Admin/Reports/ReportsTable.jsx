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

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["admin-reports", user?.email],
    queryFn: async () => {
      const res = await axiosSecure("admin-reports");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  console.log(reports);

  if (reports.length === 0) {
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
    <div className="space-y-6">
      <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-sm">
        <table className="table w-full">
          {/* Table Header */}
          <thead className="bg-gray-50 text-gray-600 font-semibold text-sm">
            <tr>
              <th className="py-4">Product Info</th>
              <th>Reported By</th>
              <th>Vendor Details</th>
              <th>Customer Review Info</th>
              <th>Report Reason</th>
              <th className="text-right pr-6">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100">
            {reports.map((report) => {
              return (
                <tr
                  key={report._id}
                  className="hover:bg-gray-50/70 transition-all duration-200"
                >
                  {/* Product Info */}
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squirrel w-12 h-12 border border-gray-100">
                          <img
                            src={report.productImage}
                            alt={report.productName}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 text-sm whitespace-nowrap">
                          {report.productName}
                        </div>
                        <div
                          className="text-xs text-gray-400 mt-0.5"
                          title={report.productId}
                        >
                          ID: {report.productId}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Reported By */}
                  <td>
                    <span
                      className="text-sm font-bold text-yellow-600 block max-w-45"
                      title={report.reportedBy}
                    >
                      {report.reportedBy.charAt(0).toUpperCase() +
                        report.reportedBy.slice(1)}
                    </span>
                  </td>

                  {/* Vendor Email */}
                  <td>
                    <span
                      className="text-sm font-medium text-gray-600 block max-w-45 truncate"
                      title={report.vendorEmail}
                    >
                      {report.vendorEmail}
                    </span>
                  </td>

                  {/* Customer Review Info */}
                  <td>
                    <div className="text-sm max-w-50">
                      <span
                        className="font-semibold text-gray-700 block truncate"
                        title={report.customerEmail}
                      >
                        {report.customerEmail}
                      </span>
                      <span
                        className="text-xs text-descriptions italic block mt-0.5"
                        title={report.customerReviewMessage}
                      >
                        "
                        {report.customerReviewMessage
                          ? report.customerReviewMessage
                          : "Reported By Customer"}
                        "
                      </span>
                    </div>
                  </td>

                  {/* Report Message from Vendor */}
                  <td>
                    <div className="text-sm max-w-55">
                      <span
                        className="font-bold text-red-600 block truncate"
                        title={report.subject}
                      >
                        {report.subject}
                      </span>
                      <span
                        className="text-xs text-gray-500 block mt-0.5"
                        title={report.message || report.reportMessage}
                      >
                        {report.message || report.reportMessage}
                      </span>
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td>
                    {report.reportedBy === "customer" ? (
                      <Link
                        to="/dashboard-layout/manage-vendors"
                        className="btn btn-warning border-none shadow-none whitespace-nowrap"
                      >
                        Manage Vendor
                      </Link>
                    ) : (
                      <Link
                        to="/dashboard-layout/manage-users"
                        className="btn btn-warning border-none shadow-none whitespace-nowrap"
                      >
                        Manage Customer
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsTable;
