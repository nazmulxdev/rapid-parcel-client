import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import LoadingSpinner from "../../Shared/Utilities/LoadingSpinner";
import Swal from "sweetalert2";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [selectedRider, setSelectedRider] = useState("");
  const queryClient = useQueryClient();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/assignable");
      return res.data;
    },
  });

  const { data: riders = [] } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });

  const assignMutation = useMutation({
    mutationFn: async ({ parcelId, rider }) => {
      const res = await axiosSecure.patch(`/parcels/${parcelId}/assign`, {
        riderEmail: rider.email,
        riderName: rider.name,
      });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Assigned!", "Rider has been assigned.", "success");
      queryClient.invalidateQueries(["assignableParcels"]);
      setSelectedParcel(null);
      setSelectedRider("");
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Parcels Ready for Assignment</h2>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Tracking ID</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Region</th>
            <th>Cost</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel) => (
            <tr key={parcel._id}>
              <td>{parcel.tracking_id}</td>
              <td>{parcel.senderName}</td>
              <td>{parcel.receiverName}</td>
              <td>{parcel.receiverRegion}</td>
              <td>৳{parcel.cost}</td>
              <td>{parcel.creation_date}</td>
              <td>
                <button
                  className="btn btn-outline btn-sm btn-primary text-black"
                  onClick={() => setSelectedParcel(parcel)}
                >
                  <FaUserPlus className="mr-1" /> Assign Rider
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Assigning Rider */}
      {selectedParcel && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-lg flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-bold mb-4">
              Assign Rider to {selectedParcel.tracking_id}
            </h3>

            <select
              className="select select-bordered w-full"
              value={selectedRider}
              onChange={(e) => setSelectedRider(e.target.value)}
            >
              <option value="">Select a Rider</option>
              {riders.map((rider) => (
                <option key={rider._id} value={rider.email}>
                  {rider.name} - {rider.email}
                </option>
              ))}
            </select>

            <div className="flex justify-end mt-4 gap-2">
              <button
                className="btn btn-sm"
                onClick={() => {
                  setSelectedParcel(null);
                  setSelectedRider("");
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-sm btn-primary"
                disabled={!selectedRider}
                onClick={() => {
                  const rider = riders.find((r) => r.email === selectedRider);
                  assignMutation.mutate({
                    parcelId: selectedParcel._id,
                    rider,
                  });
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignRider;
