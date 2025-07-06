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
import AdminUserManager from "../Pages/Dashbord/ManageAdmin/AdminUserManager";
import Forbidden from "../Pages/Forbidden/Forbidden";
import AdminRoute from "../Routes/AdminRoute";
import AssignRider from "../Pages/Dashbord/AssignRider/AssignRider";
import PendingDeliveries from "../Pages/Dashbord/PendingDeliveries/PendingDeliveries";
import RidersRoute from "../Routes/RidersRoute";
import MyFinishedDelivery from "../Pages/Dashbord/MyFinishedDelivery/MyFinishedDelivery";
import ConfirmPayment from "../Pages/Dashbord/ConfirmPayment/ConfirmPayment";

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
      // riders only routes
      {
        path: "/dashboard/pendingDeliveries",
        element: (
          <RidersRoute>
            <PendingDeliveries></PendingDeliveries>
          </RidersRoute>
        ),
      },
      {
        path: "/dashboard/completedDeliveries",
        element: (
          <RidersRoute>
            <MyFinishedDelivery></MyFinishedDelivery>
          </RidersRoute>
        ),
      },
      // admin only routes
      {
        path: "/dashboard/active-riders",
        element: (
          <AdminRoute>
            <ActiveRiders></ActiveRiders>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/pending-riders",
        element: (
          <AdminRoute>
            <PendingRiders></PendingRiders>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/assign-riders",
        element: (
          <AdminRoute>
            <AssignRider></AssignRider>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-admins",
        element: (
          <AdminRoute>
            <AdminUserManager></AdminUserManager>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/confirm-payment",
        element: (
          <AdminRoute>
            <ConfirmPayment></ConfirmPayment>
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/forbidden",
    Component: Forbidden,
  },
]);

export default Router;
