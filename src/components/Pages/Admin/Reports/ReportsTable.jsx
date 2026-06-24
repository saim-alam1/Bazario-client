import LottiePlayer from "lottie-react";
import noData from "../../../../assets/noData.json";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../UI/Loading/Loading";

const ReportsTable = () => {
  const { user } = useAuth();
  const Lottie = LottiePlayer.default || LottiePlayer;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const axiosSecure = useAxiosSecure();

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["reports", user?.email],
    queryFn: async () => {
      const res = await axiosSecure("reports");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  console.log(reports);

  return (
    // <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-sm">
    //       <table className="table w-full">
    //         <thead className="bg-gray-50">
    //           <tr>
    //             <th>Product</th>
    //             <th>Rating</th>
    //             <th>Review Message</th>
    //             <th>Admin Report</th>
    //             <th>Actions</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {products.map((product) => {

    //             return (
    //               <tr key={product._id} className="hover:bg-gray-50 transition">
    //                 <td>
    //                   <div className="flex items-center gap-3">
    //                     <div className="avatar">
    //                       <div className="mask mask-squirrel w-12 h-12">
    //                         <img src={product.productImage} alt="product" />
    //                       </div>
    //                     </div>
    //                     <div className="font-bold whitespace-nowrap">
    //                       {product.productName}
    //                     </div>
    //                   </div>
    //                 </td>

    //                 <td>
    //                   <button
    //                     className="btn btn-warning whitespace-nowrap"
    //                     onClick={() => {
    //                       setSelectedProduct(product);
    //                       document.getElementById("my_modal_5").showModal();
    //                     }}
    //                   >
    //                     Product Review
    //                   </button>
    //                 </td>

    //                 <td>
    //                   <button
    //                     className="btn btn-warning whitespace-nowrap"
    //                     onClick={() => {
    //                       setSelectedProduct(product);
    //                       document.getElementById("my_modal_6").showModal();
    //                     }}
    //                   >
    //                     Report Admin
    //                   </button>
    //                 </td>

    //                 <td>
    //                   <button
    //                     className="btn btn-error btn-sm whitespace-nowrap"
    //                     // disabled={!vendorReview || reviewDeleting}
    //                     onClick={() =>
    //                       deleteReview(vendorReview._id, product.productName)
    //                     }
    //                   >
    //                     {/* {reviewDeleting ? "..." : "Delete Review"} */}Delete
    //                   </button>
    //                 </td>
    //               </tr>
    //             );
    //           })}
    //         </tbody>
    //       </table>

    //     </div>
    <h1>hello</h1>
  );
};

export default ReportsTable;
