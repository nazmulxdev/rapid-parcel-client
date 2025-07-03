import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import debounce from "lodash.debounce"; // if not installed: npm i lodash.debounce
import LoadingSpinner from "../../Shared/Utilities/LoadingSpinner";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce input (300ms)
  const debounceSearch = debounce((value) => {
    setDebouncedSearch(value);
  }, 300);

  useEffect(() => {
    debounceSearch(searchText);
    return () => debounceSearch.cancel();
  }, [searchText, debounceSearch]);

  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["activeRiders", debouncedSearch],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders/active?search=${debouncedSearch}`,
      );
      return res.data;
    },
  });

  const handleDeactivate = async (id) => {
    const result = await Swal.fire({
      title: "Deactivate Rider?",
      text: "They won’t be able to access anymore.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, deactivate",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/riders/${id}`, { status: "deactivated" });
        Swal.fire("Deactivated", "Rider has been deactivated.", "success");
        refetch();
      } catch (err) {
        Swal.fire("Error", "Failed to deactivate rider", err);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Active Riders</h2>

      <input
        type="text"
        placeholder="Search by name or email"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="input input-bordered w-full mb-4"
      />

      {isLoading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : riders.length === 0 ? (
        <p className="text-gray-500">No active riders found.</p>
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
                <th>Action</th>
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
                  <td>
                    <button
                      onClick={() => handleDeactivate(rider._id)}
                      className="btn btn-sm btn-error"
                    >
                      Deactivate
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

export default ActiveRiders;
