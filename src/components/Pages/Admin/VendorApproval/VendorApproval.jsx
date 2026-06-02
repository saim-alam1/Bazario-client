import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../UI/Loading/Loading";
import { Helmet } from "react-helmet-async";
import VendorApprovalTable from "./VendorApprovalTable";

const VendorApproval = () => {
  const axiosSecure = useAxiosSecure();

  const { data: vendorApplicants = [], isLoading } = useQuery({
    queryKey: ["vendor-applicants"],
    queryFn: async () => {
      const res = await axiosSecure("vendors-applicants");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="my-12 px-3">
      <Helmet>
        <title>Vendor Approval | Bazario Admin</title>
        <meta
          name="description"
          content="Review and manage vendor applications. Approve or reject seller requests and maintain marketplace quality."
        />
      </Helmet>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 space-y-12">
        <div>
          <h1 className="text-3xl font-bold">Vendor Approval Requests</h1>

          <p className="text-base-content/70 mt-1">
            Review seller applications and approve qualified vendors.
          </p>
        </div>

        <div className="badge badge-lg bg-amber-500 text-white p-4 font-semibold">
          Total Applications: {vendorApplicants.length}
        </div>
      </div>

      <VendorApprovalTable vendorApplicants={vendorApplicants} />
    </section>
  );
};

export default VendorApproval;
