import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/Utilities/LoadingSpinner";

const PaymentForm = () => {
  const { parcelId } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  //   const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { data: parcelInfo = {}, isPending } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  const amount = parcelInfo.cost;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);

    if (!stripe || !elements) {
      setMessage("Stripe has not loaded yet.");
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      setMessage("Card element not loaded yet.");
      return;
    }
    // step:1- validate the card
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("errors from payment", error);
      setMessage(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setMessage("Pending Payment ");
      //   setLoading(false);
    }
    // console.log(parcelInfo);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-2xl shadow-2xl w-full max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-center">Checkout</h2>

      <CardElement className="p-2 border rounded" />

      <button
        type="submit"
        disabled={!stripe}
        className="btn btn-primary my-4 w-full"
      >
        pay ${amount}
      </button>

      {message && (
        <p className="text-center text-sm text-red-500 mt-2">{message}</p>
      )}
    </form>
  );
};

export default PaymentForm;
