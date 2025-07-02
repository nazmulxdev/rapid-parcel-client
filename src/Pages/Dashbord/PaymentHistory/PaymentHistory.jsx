import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/Utilities/LoadingSpinner";

const PaymentHistory = () => {
  const { currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: payments = [],
    isError,
    isPending,
    error,
  } = useQuery({
    queryKey: ["myPayments", currentUser.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/myPayments?email=${currentUser.email}`,
      );
      return res.data;
    },
  });
  if (isPending) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (isError) {
    console.log(error);
  }
  console.log(payments);
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        My Payment History
      </h2>

      <div className="overflow-x-auto bg-white shadow-xl rounded-2xl">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base font-semibold text-gray-700">
            <tr>
              <th>No.</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Card Info</th>
              <th>Transaction ID</th>
              <th>Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>${payment.amount}</td>
                <td>{payment.paymentMethod}</td>
                <td>
                  {payment.cardBrand.toUpperCase()} **** {payment.cardLast4}
                </td>
                <td className="break-all">{payment.transactionId}</td>
                <td>{new Date(payment.paid_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
