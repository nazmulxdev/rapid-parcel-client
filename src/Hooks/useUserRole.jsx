import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const email = currentUser?.email;

  const {
    data: role = "user",
    isPending: isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    enabled: !authLoading && !!email,
    queryKey: ["userRole", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${email}`);
      return res.data.role;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  return { role, roleLoading: authLoading || isLoading, isError, error, refetch };
};

export default useUserRole;
