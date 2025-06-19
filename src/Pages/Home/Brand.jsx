import Marquee from "react-fast-marquee";
import client1 from "../../assets/brands/amazon.png";
import client2 from "../../assets/brands/amazon_vector.png";
import client3 from "../../assets/brands/casio.png";
import client4 from "../../assets/brands/moonstar.png";
import client5 from "../../assets/brands/randstad.png";
import client6 from "../../assets/brands/start-people 1.png";
import client7 from "../../assets/brands/start.png";

const clientLogos = [
  client1,
  client2,
  client3,
  client4,
  client5,
  client6,
  client7,
];

const Brand = () => {
  return (
    <section className="py-14 px-4 md:px-10 lg:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#03373D] mb-6">
        We've helped thousands of sales teams
      </h2>
      <Marquee
        direction="right"
        speed={50}
        gradient={false}
        pauseOnHover={true}
        className="overflow-hidden"
      >
        <div className="flex items-center gap-24">
          {clientLogos.concat(clientLogos).map((logo, index) => (
            <div key={index} className="flex justify-center items-center">
              <img
                src={logo}
                alt={`Client ${index + 1}`}
                className="h-6 w-auto object-contain transition duration-300"
              />
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default Brand;
