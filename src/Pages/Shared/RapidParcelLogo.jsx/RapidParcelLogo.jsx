import logo from "../../../assets/logo.png";

const RapidParcelLogo = () => {
  return (
    <div className="flex items-end">
      <img className="mb-2" src={logo} alt="" />
      <p className="-ml-2.5 text-3xl font-extrabold">RapidParcel</p>
    </div>
  );
};

export default RapidParcelLogo;
