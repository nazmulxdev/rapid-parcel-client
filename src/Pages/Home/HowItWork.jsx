import {
  FaBoxOpen,
  FaMapMarkedAlt,
  FaShippingFast,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaBoxOpen className="text-4xl text-[#ACC857]" />,
    title: "Book Your Parcel",
    description:
      "Schedule a pickup in seconds with our seamless booking system.",
  },
  {
    icon: <FaMapMarkedAlt className="text-4xl text-[#ACC857]" />,
    title: "Track in Real-Time",
    description: "Get live updates as your parcel moves through the city.",
  },
  {
    icon: <FaShippingFast className="text-4xl text-[#ACC857]" />,
    title: "Fast Delivery",
    description: "We deliver lightning-fast with safety as our top priority.",
  },
  {
    icon: <FaCheckCircle className="text-4xl text-[#ACC857]" />,
    title: "Confirm & Done",
    description: "Receive confirmation instantly after successful delivery.",
  },
];

const HowItWork = () => {
  return (
    <section className="py-12 px-4 md:px-10 lg:px-20 bg-base-100">
      <div>
        <h2 className="text-start text-3xl md:text-4xl font-bold text-[#ACC857] mb-10">
          How It Works
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="card shadow-md bg-base-200 hover:shadow-xl transition duration-300"
          >
            <div className="card-body items-center text-center">
              <div className="mb-3">{step.icon}</div>
              <h3 className="card-title text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-base-content">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWork;
