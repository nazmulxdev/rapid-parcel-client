import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  //   const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (!card) {
      return card;
    }

    const { error, payment } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("errors from payment", error);
      setMessage(error.message);
    } else {
      console.log("payment method", payment);
      setMessage("successful");
      //   setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="]space-y-4 bg-white p-6 rounded-2xl shadow-2xl w-full max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-center">Checkout</h2>

      <CardElement className="p-2 border rounded" />

      <button
        type="submit"
        disabled={!stripe}
        className="btn btn-primary my-4 w-full"
      >
        pay Naw
      </button>

      {message && (
        <p className="text-center text-sm text-red-500 mt-2">{message}</p>
      )}
    </form>
  );
};

export default PaymentForm;
