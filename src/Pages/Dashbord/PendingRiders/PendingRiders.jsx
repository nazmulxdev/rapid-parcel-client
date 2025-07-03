import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  const {
    data: riders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  const handleAction = async (id, action) => {
    const result = await Swal.fire({
      title: `Are you sure to ${action} this rider?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action}`,
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/riders/${id}`, { status: action });
        Swal.fire("Success!", `Rider ${action}ed successfully.`, "success");
        refetch();
      } catch (err) {
        Swal.fire("Error!", "Failed to update status.", "error");
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Riders</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : riders.length === 0 ? (
        <p className="text-gray-500">No pending riders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Region</th>
                <th>District</th>
                <th>Warehouse</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider, idx) => (
                <tr key={rider._id}>
                  <td>{idx + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>{rider.region}</td>
                  <td>{rider.district}</td>
                  <td>{rider.preferredWarehouse}</td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => setSelectedRider(rider)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleAction(rider._id, "accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleAction(rider._id, "cancelled")}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedRider && (
        <dialog id="riderModal" className="modal modal-open">
          <div className="modal-box max-w-xl">
            <h3 className="font-bold text-lg mb-2">Rider Details</h3>
            <div className="space-y-1">
              <p>
                <strong>Name:</strong> {selectedRider.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedRider.email}
              </p>
              <p>
                <strong>Age:</strong> {selectedRider.age}
              </p>
              <p>
                <strong>NID:</strong> {selectedRider.nidNo}
              </p>
              <p>
                <strong>Contact:</strong> {selectedRider.contact}
              </p>
              <p>
                <strong>Region:</strong> {selectedRider.region}
              </p>
              <p>
                <strong>District:</strong> {selectedRider.district}
              </p>
              <p>
                <strong>Warehouse:</strong> {selectedRider.preferredWarehouse}
              </p>
              <p>
                <strong>Status:</strong> {selectedRider.status}
              </p>
              <p>
                <strong>Applied At:</strong>{" "}
                {new Date(selectedRider.appliedAt).toLocaleString()}
              </p>
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedRider(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PendingRiders;
