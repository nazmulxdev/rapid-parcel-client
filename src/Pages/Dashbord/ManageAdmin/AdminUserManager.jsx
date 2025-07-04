import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../Shared/Utilities/LoadingSpinner";
import Swal from "sweetalert2";

const AdminUserManager = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [searchInput, setSearchInput] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Memoize debounce so it doesn't recreate on every render
  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setDebouncedQuery(value.trim());
      }, 500),
    [],
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["searched-users", debouncedQuery],
    enabled: !!debouncedQuery,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/search?query=${debouncedQuery}`,
      );
      return res.data;
    },
  });

  const roleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `${
          role !== "admin"
            ? "are you sure , want to remove this user from admin?"
            : " You want to make this user as admin ?"
        }`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `${
          role === "admin" ? "Yes, make as admin" : " Yes, remove from admin"
        }`,
      });
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/users/${id}/role`, { role });
        return res.data;
      } else {
        throw new Error("Role change cancelled");
      }
    },
    onSuccess: () => {
      Swal.fire({
        title: "Congratulations!",
        text: "Your have changed this user role successfully.",
        icon: "success",
      });
      queryClient.invalidateQueries(["searched-users", debouncedQuery]);
    },
    onError: (error) => {
      if (error.message !== "Role change cancelled") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to update role",
        });
      }
    },
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-center">
        👑 Admin Manager
      </h2>

      <input
        type="search"
        className="input input-bordered w-full max-w-xl mx-auto block mb-6 text-lg"
        placeholder="Search users by name or email..."
        value={searchInput}
        onChange={handleInputChange}
        autoComplete="off"
      />

      {isLoading && <LoadingSpinner />}

      {!debouncedQuery && !isLoading && (
        <div className="text-center text-gray-500 mt-20 space-y-3">
          <p className="text-xl">✨ Ready to manage admins?</p>
          <p className="italic">
            Type a name or email above to start searching.
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
            alt="Search icon"
            className="w-20 h-20 mx-auto opacity-30"
          />
        </div>
      )}

      {!isLoading && debouncedQuery && users.length === 0 && (
        <p className="text-center text-red-500 mt-10 text-lg">
          No users found 🔍
        </p>
      )}

      {!isLoading && users.length > 0 && (
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {users.map((user) => (
            <div
              key={user._id}
              className="card bg-white border border-gray-200 shadow-md rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold">
                  {user.name || "No Name"}
                </h3>
                <p className="text-gray-600">Email: {user.email}</p>
                <p className="mt-1">
                  Role:{" "}
                  <span className="badge badge-info lowercase font-medium px-3 py-1 rounded-md">
                    {user.role || "user"}
                  </span>
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Created: {new Date(user.created_at).toLocaleDateString()}
                </p>
                <p className="text-gray-400 text-sm">
                  Last Login: {new Date(user.last_log_in).toLocaleString()}
                </p>
              </div>

              <div className="mt-4 md:mt-0 flex gap-3">
                {user.role !== "admin" ? (
                  <button
                    onClick={() =>
                      roleMutation.mutate({ id: user._id, role: "admin" })
                    }
                    className="btn btn-success btn-sm whitespace-nowrap"
                    disabled={roleMutation.isLoading}
                  >
                    Make Admin
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      roleMutation.mutate({ id: user._id, role: "user" })
                    }
                    className="btn btn-warning btn-sm whitespace-nowrap"
                    disabled={roleMutation.isLoading}
                  >
                    Remove Admin
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUserManager;
