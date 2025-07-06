import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../Shared/Utilities/LoadingSpinner";
import Swal from "sweetalert2";

const PendingDeliveries = () => {
  const { currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["rider-tasks", currentUser?.email],
    enabled: !!currentUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/tasks?email=${currentUser?.email}`,
      );
      return res.data;
    },
  });

  // Mutation to update delivery_status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ parcelId, newStatus }) => {
      const res = await axiosSecure.patch(`/parcels/${parcelId}/status`, {
        delivery_status: newStatus,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Parcel status updated");
      queryClient.invalidateQueries(["rider-tasks"]);
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });

  const handleStatusUpdate = (parcelId, newStatus) => {
    const statusLabel =
      newStatus === "in_transit"
        ? "mark this parcel as picked up"
        : "mark this parcel as delivered";

    Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${statusLabel}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({ parcelId, newStatus });
      }
    });
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📦 Pending Deliveries</h2>

      {isLoading ? (
        <LoadingSpinner />
      ) : parcels.length === 0 ? (
        <p className="text-center text-gray-500">No pending deliveries 🚚</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Parcel</th>
                <th>Receiver</th>
                <th>Contact</th>
                <th>Region</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => (
                <tr key={parcel._id}>
                  <td>{parcel.tracking_id}</td>
                  <td>{parcel.title}</td>
                  <td>{parcel.receiverName}</td>
                  <td>{parcel.receiverContact}</td>
                  <td>{parcel.receiverRegion}</td>
                  <td>৳{parcel.cost}</td>
                  <td>
                    <span className="badge badge-info capitalize">
                      {parcel.delivery_status}
                    </span>
                  </td>
                  <td>
                    {parcel.delivery_status === "assigned" && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(parcel._id, "in_transit")
                        }
                        className="btn btn-sm btn-warning"
                      >
                        Mark as Picked Up
                      </button>
                    )}

                    {parcel.delivery_status === "in_transit" && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(parcel._id, "delivered")
                        }
                        className="btn btn-sm btn-success"
                      >
                        Mark as Delivered
                      </button>
                    )}

                    {parcel.delivery_status === "delivered" && (
                      <span className="text-green-600 font-semibold">
                        ✓ Delivered
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

export default PendingDeliveries;
