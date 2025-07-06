import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/Utilities/LoadingSpinner";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";

const ConfirmPayment = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();

  const {
    data: requestedCashouts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["requested-cashouts", currentUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/cashouts?status=requested`);
      return res.data;
    },
  });

  const confirmCashout = useMutation({
    mutationFn: async ({ parcelId }) => {
      const res = await axiosSecure.patch(`/admin/cashOut/${parcelId}`, {
        confirmed_by: currentUser?.email || "admin",
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Marked as paid ✅");
      queryClient.invalidateQueries(["requested-cashouts"]);
    },
    onError: () => {
      toast.error("Failed to confirm cashout ❌");
    },
  });

  const handleConfirm = (parcelId) => {
    Swal.fire({
      title: "Confirm Cashout?",
      text: "You are about to confirm the rider's payment.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
    }).then((result) => {
      if (result.isConfirmed) {
        confirmCashout.mutate({ parcelId });
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Failed to load data</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">💵 Rider Payment Requests</h2>
      {requestedCashouts.length === 0 ? (
        <p className="text-gray-500">No pending payment requests.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Rider</th>
                <th>Amount</th>
                <th>Requested At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requestedCashouts.map((parcel) => (
                <tr key={parcel._id}>
                  <td className="font-mono font-semibold">
                    {parcel.tracking_id}
                  </td>
                  <td>{parcel.assigned_rider_name}</td>
                  <td>
                    ৳
                    {parcel.senderCenter.toLowerCase() ===
                    parcel.receiverCenter.toLowerCase()
                      ? (parcel.cost * 0.8).toFixed(2)
                      : (parcel.cost * 0.3).toFixed(2)}
                  </td>
                  <td>
                    {parcel.cashout_requested_at
                      ? new Date(parcel.cashout_requested_at).toLocaleString()
                      : "—"}
                  </td>
                  <td>
                    <button
                      onClick={() => handleConfirm(parcel._id)}
                      className="btn btn-sm btn-success"
                    >
                      Confirm Payment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ConfirmPayment;
