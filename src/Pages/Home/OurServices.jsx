import {
  FaShippingFast,
  FaMapMarkedAlt,
  FaWarehouse,
  FaMoneyBillWave,
  FaBuilding,
  FaUndo,
} from "react-icons/fa";

const services = [
  {
    icon: <FaShippingFast className="text-4xl text-[#03373D]" />,
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
  },
  {
    icon: <FaMapMarkedAlt className="text-4xl text-[#03373D]" />,
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
  },
  {
    icon: <FaWarehouse className="text-4xl text-[#03373D]" />,
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
  },
  {
    icon: <FaMoneyBillWave className="text-4xl text-[#03373D]" />,
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
  },
  {
    icon: <FaBuilding className="text-4xl text-[#03373D]" />,
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
  },
  {
    icon: <FaUndo className="text-4xl text-[#03373D]" />,
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
  },
];

const OurServices = () => {
  return (
    <section className="py-14 px-4 md:px-10 lg:px-20 bg-[#03373D] rounded-2xl mb-10 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Our Services
      </h2>
      <p className="text-base md:text-lg text-white max-w-2xl mx-auto mb-10">
        From same-day delivery to nationwide logistics — Rapid Parcel has you
        covered with full-stack courier solutions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl p-6 shadow hover:shadow-md transition hover:bg-[#ACC857]"
          >
            <div className="mb-4 flex justify-center">{service.icon}</div>
            <h3 className="text-2xl font-bold mb-2 text-[#03373D]">{service.title}</h3>
            <p className="text-base font-medium text-gray-600 text-justify">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
