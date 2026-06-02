const VendorApprovalTable = ({ vendorApplicants }) => {
  return (
    <div className="overflow-x-auto bg-base-100 rounded-xl border border-base-300">
      <table className="table">
        <thead className="bg-base-200">
          <tr>
            <th>Applicant</th>
            <th>Store Name</th>
            <th>Business Type</th>
            <th>Contact</th>
            <th>Country</th>
            <th>Delivery</th>
            <th>Applied On</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {vendorApplicants.map((applicant) => (
            <tr key={applicant._id}>
              {/* Applicant */}
              <td>
                <div>
                  <h3 className="font-semibold text-base">
                    {applicant.fullName}
                  </h3>

                  <p className="text-base">{applicant.email}</p>
                </div>
              </td>

              {/* Store */}
              <td>
                <div>
                  <h3 className="font-medium text-base">
                    {applicant.storeName}
                  </h3>

                  <p
                    className="text-sm text-descriptions max-w-62.5 truncate"
                    title={applicant.storeDescription}
                  >
                    {applicant.storeDescription}
                  </p>
                </div>
              </td>

              {/* Business Type */}
              <td className="font-medium text-base">
                {applicant.businessType}
              </td>

              {/* Contact */}
              <td className="font-medium text-base">
                +{applicant.contactNumber}
              </td>

              {/* Country */}
              <td className="font-medium text-base">{applicant.country}</td>

              {/* Delivery */}
              <td className="font-medium text-base">
                {applicant.deliveryCapability}
              </td>

              {/* Date */}
              <td className="font-medium text-base">
                {new Date(applicant.requestedAt).toLocaleDateString()}
              </td>

              {/* Status */}
              <td>
                <span
                  className={`badge ${
                    applicant.status === "approved"
                      ? "badge-success"
                      : applicant.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                  }`}
                >
                  {applicant.status}
                </span>
              </td>

              {/* Actions */}
              <td>
                <div className="flex justify-center gap-2">
                  <button className="btn btn-success">Approve</button>

                  <button className="btn btn-error">Reject</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorApprovalTable;
