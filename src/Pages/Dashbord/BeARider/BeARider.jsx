import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import divisionData from "../../../data/division.json";
import wareHouseData from "../../../data/warehouses.json";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const BeARider = () => {
  const { currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, reset } = useForm();

  const [divisions, setDivisions] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [filteredWarehouses, setFilteredWarehouses] = useState([]);

  const selectedRegion = watch("region");
  const selectedDistrict = watch("district");

  useEffect(() => {
    setDivisions(divisionData);
    setWarehouses(wareHouseData);
  }, []);

  useEffect(() => {
    if (selectedRegion && warehouses.length > 0) {
      const regionDistricts = warehouses
        .filter((w) => w.region === selectedRegion)
        .map((w) => w.district);
      setDistricts([...new Set(regionDistricts)]);
    }
  }, [selectedRegion, warehouses]);

  useEffect(() => {
    if (selectedDistrict && warehouses.length > 0) {
      const filtered = warehouses.filter(
        (w) => w.district === selectedDistrict,
      );
      setFilteredWarehouses(filtered);
    }
  }, [selectedDistrict, warehouses]);

  const onSubmit = async (data) => {
    const riderData = {
      name: currentUser?.displayName,
      email: currentUser?.email,
      age: data.age,
      region: data.region,
      district: data.district,
      nidNo: data.nidNo,
      contact: data.contact,
      preferredWarehouse: data.preferredWarehouse,
      status: "pending",
      appliedAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/riders", riderData);
      if (res.data.insertedId) {
        await Swal.fire({
          icon: "success",
          title: "Application Submitted ✅",
          text: "Your rider application is under review.",
          confirmButtonColor: "#3085d6",
        });
        reset();
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response?.status === 409) {
        Swal.fire({
          icon: "warning",
          title: "Already Applied ❗",
          text: "You’ve already submitted a rider application.",
          confirmButtonColor: "#d33",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops... Something went wrong!",
          text: "Failed to submit your application.",
          confirmButtonColor: "#d33",
        });
      }
      console.error(err);
    }

    console.log(riderData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Be a Rider</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            readOnly
            defaultValue={currentUser?.displayName}
            className="input input-bordered w-full"
          />
          <input
            readOnly
            defaultValue={currentUser?.email}
            className="input input-bordered w-full"
          />
          <input
            {...register("age", { required: true })}
            placeholder="Age"
            type="number"
            className="input input-bordered w-full"
          />
          <input
            {...register("nidNo", { required: true })}
            placeholder="NID Number"
            className="input input-bordered w-full"
          />
          <input
            {...register("contact", { required: true })}
            placeholder="Contact Number"
            className="input input-bordered w-full"
          />
          <select
            {...register("region", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Region</option>
            {divisions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          <select
            {...register("district", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select District</option>
            {districts.map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>
          <select
            {...register("preferredWarehouse", { required: true })}
            className="select select-bordered w-full col-span-2"
          >
            <option value="">Select Preferred Warehouse</option>
            {filteredWarehouses.map((wh) => (
              <option
                key={wh.city}
                value={wh.city}
              >{`${wh.city} (${wh.district})`}</option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary w-full mt-4" type="submit">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default BeARider;
