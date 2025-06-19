import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import topLogo from "../../assets/customer-top.png";

const reviews = [
  {
    user_email: "john.doe@example.com",
    userName: "John Doe",
    delivery_email: "delivery1@example.com",
    ratings: 4.5,
    review: "Smooth delivery and polite staff.",
    parcel_id: "5f47ac10b4f1c03e8c654321",
    pick_up_email: "pickup1@example.com",
    user_photoURL: "https://randomuser.me/api/portraits/men/10.jpg",
    date: "2024-05-08T14:30:00.000Z",
  },
  {
    user_email: "jane.smith@example.com",
    userName: "Jane Smith",
    delivery_email: "delivery2@example.com",
    ratings: 3.8,
    review: "Took a bit longer than expected, but okay overall.",
    parcel_id: "5f47ac10b4f1c03e8c765432",
    pick_up_email: "pickup2@example.com",
    user_photoURL: "https://randomuser.me/api/portraits/women/25.jpg",
    date: "2024-06-10T10:15:00.000Z",
  },
  {
    user_email: "alex.brown@example.com",
    userName: "Alex Brown",
    delivery_email: "delivery3@example.com",
    ratings: 5.0,
    review: "Excellent service! Fast and secure.",
    parcel_id: "5f47ac10b4f1c03e8c876543",
    pick_up_email: "pickup3@example.com",
    user_photoURL: "https://randomuser.me/api/portraits/men/34.jpg",
    date: "2024-07-01T08:50:00.000Z",
  },
  {
    user_email: "lisa.white@example.com",
    userName: "Lisa White",
    delivery_email: "delivery4@example.com",
    ratings: 4.2,
    review: "Very responsive and professional.",
    parcel_id: "5f47ac10b4f1c03e8c987654",
    pick_up_email: "pickup4@example.com",
    user_photoURL: "https://randomuser.me/api/portraits/women/12.jpg",
    date: "2024-07-15T09:10:00.000Z",
  },
  {
    user_email: "david.lee@example.com",
    userName: "David Lee",
    delivery_email: "delivery5@example.com",
    ratings: 2.9,
    review: "Late delivery and no updates. Disappointed.",
    parcel_id: "5f47ac10b4f1c03e8c098765",
    pick_up_email: "pickup5@example.com",
    user_photoURL: "https://randomuser.me/api/portraits/men/19.jpg",
    date: "2024-08-02T16:45:00.000Z",
  },
  {
    user_email: "nina.khan@example.com",
    userName: "Nina Khan",
    delivery_email: "delivery6@example.com",
    ratings: 4.9,
    review: "Superb experience! Highly recommended.",
    parcel_id: "5f47ac10b4f1c03e8c109876",
    pick_up_email: "pickup6@example.com",
    user_photoURL: "https://randomuser.me/api/portraits/women/8.jpg",
    date: "2024-08-10T12:00:00.000Z",
  },
  {
    user_email: "michael.jordan@example.com",
    userName: "Michael Jordan",
    delivery_email: "delivery7@example.com",
    ratings: 3.3,
    review: "Decent service but packaging could be better.",
    parcel_id: "5f47ac10b4f1c03e8c210987",
    pick_up_email: "pickup7@example.com",
    user_photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
    date: "2024-08-14T18:20:00.000Z",
  },
  {
    user_email: "emma.watson@example.com",
    userName: "Emma Watson",
    delivery_email: "delivery8@example.com",
    ratings: 4.7,
    review: "Fast, safe, and friendly delivery service.",
    parcel_id: "5f47ac10b4f1c03e8c321098",
    pick_up_email: "pickup8@example.com",
    user_photoURL: "https://randomuser.me/api/portraits/women/5.jpg",
    date: "2024-08-20T07:30:00.000Z",
  },
];

const SwiperReviewSlider = () => {
  return (
    <section className="py-12 px-4 bg-base-100 text-center">
      <img className="mx-auto" src={topLogo} alt="" />
      <h2 className="text-3xl font-bold text-[#03373D] mb-6">
        What our customers are sayings
      </h2>
      <p className="font-medium text-base mb-10">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce pain, and strengthen your body with
        ease!
      </p>

      <Swiper
        modules={[Autoplay, EffectCoverflow, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        effect="coverflow"
        centeredSlides
        grabCursor
        loop
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 2,
          slideShadows: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="!px-4"
      >
        {reviews.map((review, idx) => (
          <SwiperSlide key={idx} className="max-w-xs md:max-w-sm lg:max-w-md">
            {({ isActive }) => (
              <div
                className={`bg-white shadow-xl rounded-xl p-6 md:p-8 h-full transition duration-300 ${
                  isActive ? "opacity-100 scale-100" : "opacity-50 scale-95"
                }`}
              >
                <FaQuoteLeft className="text-[#ACC857] text-xl mb-2" />
                <p className="text-gray-700 mb-4 line-clamp-4">
                  "{review.review}"
                </p>
                <div>
                  <div className="divider border-t-2 border-dashed border-[#03373D] my-4 items-start" />
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src={review.user_photoURL}
                    alt={review.userName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-[#03373D]">
                      {review.userName}
                    </h4>
                    <p className="text-xs text-gray-500">
                      Rating: {review.ratings}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default SwiperReviewSlider;
