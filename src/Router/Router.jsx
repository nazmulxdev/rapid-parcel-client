import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import LogIn from "../Pages/Authentication/LogIn";
import Register from "../Pages/Authentication/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoute from "../Routes/PrivateRoute";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashBoardLayOut from "../Layouts/DashBoardLayOut";
import MyParcels from "../Pages/Dashbord/MyParcels/MyParcels";
import Payment from "../Pages/Dashbord/Payment/Payment";
import PaymentHistory from "../Pages/Dashbord/PaymentHistory/PaymentHistory";
import TrackParcel from "../Pages/Dashbord/TrackParcel/TrackParcel";
import BeARider from "../Pages/Dashbord/BeARider/BeARider";
import ActiveRiders from "../Pages/Dashbord/ActiveRiders/ActiveRiders";
import PendingRiders from "../Pages/Dashbord/PendingRiders/PendingRiders";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        Component: Coverage,
      },
      {
        path: "/sendParcel",
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
      },
      {
        path: "/be-a-rider",
        element: (
          <PrivateRoute>
            <BeARider></BeARider>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: LogIn,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayOut></DashBoardLayOut>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/myParcels",
        Component: MyParcels,
      },
      {
        path: "/dashboard/Payment/:parcelId",
        Component: Payment,
      },
      {
        path: "/dashboard/PaymentHistory",
        Component: PaymentHistory,
      },
      {
        path: "/dashboard/track",
        Component: TrackParcel,
      },
      {
        path: "/dashboard/active-riders",
        Component: ActiveRiders,
      },
      {
        path: "/dashboard/pending-riders",
        Component: PendingRiders,
      },
    ],
  },
]);

export default Router;
