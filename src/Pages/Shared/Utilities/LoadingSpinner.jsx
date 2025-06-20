import Lottie from "lottie-react";
import loadingAnimation from "../../../assets/lottianimationLoading.json";

const LoadingSpinner = () => {
  return (
    <div>
      <Lottie animationData={loadingAnimation}></Lottie>
    </div>
  );
};

export default LoadingSpinner;
