import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import useAuth from "./useAuth";
import useAxios from "./useAxios";
import Swal from "sweetalert2";
const axiosSecure = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  const location = useLocation();
  const axiosInstance = useAxios();
  useEffect(() => {
    const interceptor = axiosSecure.interceptors.response.use(
      (config) => {
        return config;
      },
      async (error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          await Swal.fire({
            icon: "warning",
            title: "Session expired",
            text: "Please login again to continue.",
            confirmButtonText: "OK",
            confirmButtonColor: "#d33",
          });

          try {
            // Firebase logout
            await logOut();
            // Backend logout
            await axiosInstance.post("/logout", {}, { withCredentials: true });
            navigate("/login", {
              state: location.pathname,
              replace: true,
            });
          } catch (logoutErr) {
            console.error("Logout failed:", logoutErr);
          }
        }
        // you can handle 403 here
        if (errorStatus === 403) {
          await Swal.fire({
            icon: "warning",
            title: "Forbidden access.",
            text: "This route is only for admins.",
            confirmButtonText: "OK",
            confirmButtonColor: "#d33",
          });

          try {
            // Firebase logout
            // await logOut();
            // Backend logout
            // await axiosInstance.post("/logout", {}, { withCredentials: true });
            navigate("/forbidden", {
              state: location.pathname,
              replace: true,
            });
          } catch (logoutErr) {
            console.error("Logout failed:", logoutErr);
          }
        }
        return Promise.reject(error);
      },
    );
    return () => axiosSecure.interceptors.response.eject(interceptor);
  }, [axiosInstance, location, navigate, logOut]);
  return axiosSecure;
};

export default useAxiosSecure;
