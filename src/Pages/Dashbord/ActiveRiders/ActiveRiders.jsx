import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/Utilities/LoadingSpinner";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const { data: riders = [], isLoading } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Active Riders</h2>
      {isLoading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : riders.length === 0 ? (
        <p className="text-gray-500">No active riders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Region</th>
                <th>District</th>
                <th>Warehouse</th>
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
