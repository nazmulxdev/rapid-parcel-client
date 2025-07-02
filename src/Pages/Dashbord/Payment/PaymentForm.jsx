import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/Utilities/LoadingSpinner";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const { parcelId } = useParams();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useAuth();
  //   const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { data: parcelInfo = {}, isPending } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  // console.table(parcelInfo);

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
      // console.log("errors from payment", error);
      setMessage(error.message);
    } else {
      console.log("payment method", paymentMethod);
      //   setLoading(false);

      // payment intent create backend api and call this
      const response = await axiosSecure.post("/create-payment-intent", {
        amount,
      });
      // console.log(response.data);
      const clientSecret = response.data.clientSecret;

      // step-3 confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: currentUser.displayName,
            email: currentUser.email,
          },
        },
      });
      if (result.error) {
        setMessage(result.error.message);
      } else {
        // console.log(result);
        if (result.paymentIntent.status === "succeeded") {
          setMessage("Payment Successful");
          // step-4: mark parcel paid also create payment history
          const paymentData = {
            parcelId: parcelId,
            userEmail: currentUser.email,
            amount: parcelInfo.cost,
            transactionId: result.paymentIntent.id,
            paymentIntentId: result.paymentIntent.id,
            paymentMethod: result.paymentIntent.payment_method_types[0], // usually "card"
            cardBrand:
              result.paymentIntent.charges?.data[0]?.payment_method_details
                ?.card?.brand || "unknown",
            cardLast4:
              result.paymentIntent.charges?.data[0]?.payment_method_details
                ?.card?.last4 || "0000",
          };

          console.log(paymentData);

          const paymentResponse = await axiosSecure.post(
            "/payments",
            paymentData,
          );

          // const paymentSuccess = paymentResponse.data;
          // console.log(paymentSuccess);
          if (paymentResponse.data) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Payment has been successful",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              navigate("/dashboard/myParcels");
            });
          }
        }
      }
    }
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
