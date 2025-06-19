import React from "react";
import Banner from "./Banner";
import HowItWork from "./HowItWork";
import OurServices from "./OurServices";
import Brand from "./Brand";
import Tracking from "./Tracking";
import Satisfaction from "./Satisfaction";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HowItWork></HowItWork>
      <OurServices></OurServices>
      <Brand></Brand>
      <div>
        <div className="divider border-t-2 border-dashed border-[#03373D] my-4 items-start" />
      </div>
      <Tracking></Tracking>
      <div>
        <div className="divider border-t-2 border-dashed border-[#03373D] my-4 items-start" />
      </div>
      <Satisfaction></Satisfaction>
    </div>
  );
};

export default Home;
