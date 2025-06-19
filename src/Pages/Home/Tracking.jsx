import tracking1 from "../../assets/live-tracking.png";
import tracking2 from "../../assets/safe-delivery.png";
import tracking3 from "../../assets/safe-delivery.png";

const trackingData = [
  {
    img: tracking1,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
  },
  {
    img: tracking2,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
  },
  {
    img: tracking3,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
  },
];

const Tracking = () => {
  return (
    <section className=" py-12 px-4 md:px-10 lg:px-20">
      <div className="space-y-10">
        {trackingData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-32 md:w-40 object-contain"
            />
            <div className="flex-1 border-t md:border-t-0 md:border-l border-dashed border-[#03373D] pt-4 md:pt-0 md:pl-6">
              <h3 className="text-xl font-bold text-[#03373D] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-700">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tracking;
