import heroImg from "../../assets/location-merchant.png";

const Satisfaction = () => {
  return (
    <div
      data-aos="zoom-in-up"
      className="bg-no-repeat bg-top bg-[url('assets/be-a-merchant-bg.png')] p-20 bg-[#03373D] rounded-4xl"
    >
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={heroImg} className="" />
        <div>
          <h1 className="text-5xl text-white font-bold">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-6 font-medium text-base text-white">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <button className="mr-2 bg-[#CAEB66] text-black font-bold text-xl border-none rounded-full px-8 py-4 hover:cursor-pointer">
            Become a Merchant
          </button>
          <button className="border border-[#CAEB66] bg-transparent text-[#CAEB66] font-bold text-xl rounded-full px-8 py-4 hover:cursor-pointer">
            Earn with Profast Courier
          </button>
        </div>
      </div>
    </div>
  );
};

export default Satisfaction;
