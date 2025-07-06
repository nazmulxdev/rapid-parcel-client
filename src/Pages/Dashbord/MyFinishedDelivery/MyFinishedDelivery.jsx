import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import LoadingSpinner from "../../Shared/Utilities/LoadingSpinner";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

const MyFinishedDelivery = () => {
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  const { data: deliveries = [], isLoading } = useQuery({
    queryKey: ["completed-deliveries", currentUser?.email],
    enabled: !!currentUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/completed-parcels?email=${currentUser?.email}`,
      );
      return res.data;
    },
  });

  const cashOutMutation = useMutation({
    mutationFn: async ({ parcelId, rider_earned }) => {
      const res = await axiosSecure.patch(`/rider/cashOut/${parcelId}`, {
        rider_earned,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("CashOut request sent 💸");
      queryClient.invalidateQueries([
        "completed-deliveries",
        currentUser?.email,
      ]);
    },
    onError: () => {
      toast.error("Failed to request cashOut ❌");
    },
  });

  const handleCashOutRequest = (parcelId, rider_earned) => {
    Swal.fire({
      title: "Cashout Request?",
      text: "Are you sure you want to request a cashout for this delivery?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, request it!",
    }).then((result) => {
      if (result.isConfirmed) {
        cashOutMutation.mutate({ parcelId, rider_earned });
      }
    });
  };

  const calculateEarning = (parcel) => {
    const isSameDistrict =
      parcel.senderCenter?.toLowerCase() ===
      parcel.receiverCenter?.toLowerCase();
    const earning = isSameDistrict ? parcel.cost * 0.8 : parcel.cost * 0.3;
    return earning.toFixed(2);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">📦 Completed Deliveries</h2>
      {deliveries.length === 0 ? (
        <p className="text-gray-500">No completed deliveries yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>From → To</th>
                <th>Picked Up</th>
                <th>Delivered</th>
                <th>Cost</th>
                <th>Earned</th>
                <th>Cashout</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((parcel) => (
                <tr key={parcel._id}>
                  <td className="font-mono font-semibold">
                    {parcel.tracking_id}
                  </td>
                  <td>{parcel.senderName}</td>
                  <td>{parcel.receiverName}</td>
                  <td>
                    {parcel.senderCenter} → {parcel.receiverCenter}
                  </td>
                  <td>
                    {parcel.picked_up_at
                      ? new Date(parcel.picked_up_at).toLocaleString()
                      : "—"}
                  </td>
                  <td>
                    {parcel.delivered_at
                      ? new Date(parcel.delivered_at).toLocaleString()
                      : "—"}
                  </td>
                  <td>৳{parcel.cost}</td>
                  <td className="font-bold text-green-600">
                    ৳{calculateEarning(parcel)}
                  </td>
                  <td>
                    {parcel.cashout_status === "none" ||
                    !parcel.cashout_status ? (
                      <button
                        onClick={() =>
                          handleCashOutRequest(
                            parcel._id,
                            calculateEarning(parcel),
                          )
                        }
                        className="btn btn-sm btn-primary"
                      >
                        Request Cashout
                      </button>
                    ) : (
                      <span
                        className={`badge ${
                          parcel.cashout_status === "paid"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {parcel.cashout_status}
                      </span>
                    )}
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

export default MyFinishedDelivery;
