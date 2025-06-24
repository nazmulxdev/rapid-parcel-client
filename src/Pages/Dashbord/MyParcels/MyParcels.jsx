import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/Utilities/LoadingSpinner";
import { FaEye, FaTrash, FaMoneyCheckAlt } from "react-icons/fa";
import clsx from "clsx";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    isError,
    isPending,
    error,
    data: parcels,
  } = useQuery({
    queryKey: ["my-parcels", currentUser.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${currentUser.email}`);
      return res.data;
    },
  });

  if (isPending) return <LoadingSpinner />;
  if (isError)
    return <p className="text-3xl font-bold text-red-500">{error.message}</p>;

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This parcel will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Parcel has been deleted",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            // refetch parcels or invalidate query to update UI

            // refetch(); 
            queryClient.invalidateQueries(["my-parcels", currentUser.email]);
          }
        });
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the parcel.", error);
      }
    }
  };

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">📦 My Parcels</h2>

      {parcels?.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">No parcels found 😕</p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>Type</th>
              <th>Title</th>
              <th>Date</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id} className="hover">
                <td>
                  <span className="capitalize font-medium">
                    {parcel.type.replace("-", " ")}
                  </span>
                </td>
                <td>{parcel.title}</td>
                <td>
                  {dayjs(parcel.creation_date).format("DD MMM, YYYY hh:mm A")}
                </td>
                <td className="font-semibold text-blue-600">৳{parcel.cost}</td>
                <td>
                  <span
                    className={clsx("badge px-4 py-1 text-white", {
                      "bg-green-500": parcel.payment_status === "paid",
                      "bg-yellow-500": parcel.payment_status === "unpaid",
                      "bg-red-500": parcel.payment_status === "failed",
                    })}
                  >
                    {parcel.payment_status}
                  </span>
                </td>
                <td className="flex flex-wrap gap-2">
                  <button
                    className="btn btn-sm btn-info text-white"
                    onClick={() => navigate(`/dashboard/parcels/${parcel._id}`)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => handleDelete(parcel._id)}
                  >
                    <FaTrash />
                  </button>
                  {parcel.payment_status === "unpaid" && (
                    <button
                      className="btn btn-sm btn-success text-white"
                      onClick={() =>
                        navigate(`/dashboard/payment/${parcel._id}`)
                      }
                    >
                      <FaMoneyCheckAlt /> Pay
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyParcels;
