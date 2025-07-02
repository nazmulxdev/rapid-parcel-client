import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { toast } from "react-hot-toast";

const useTrackingManager = ({
  parcelId,
  tracking_id,
  status,
  location,
  updated_by,
}) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Get tracking updates for a parcel
  const {
    data: trackingUpdates = [],
    isPending: isTrackingLoading,
    isError: isTrackingError,
    error: trackingError,
  } = useQuery({
    queryKey: ["tracking", tracking_id],
    enabled: !!tracking_id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tracking/${tracking_id}`);
      return res.data;
    },
  });

  // Add a new tracking update
  const {
    mutate: addTrackingUpdate,
    isPending: isAdding,
    isError: isAddError,
    error: addError,
  } = useMutation({
    mutationFn: async () => {
      const trackingData = {
        parcelId,
        tracking_id,
        status,
        location,
        updated_by,
      };
      const res = await axiosSecure.post("/tracking", trackingData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("✅ Tracking updated");
      queryClient.invalidateQueries(["tracking", tracking_id]);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "❌ Failed to update tracking",
      );
    },
  });

  return {
    trackingUpdates,
    isTrackingLoading,
    isTrackingError,
    trackingError,
    addTrackingUpdate,
    isAdding,
    isAddError,
    addError,
  };
};

export default useTrackingManager;
